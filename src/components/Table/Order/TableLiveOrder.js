import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getOffices, getOrders } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import hasdoner from '../../../images/hasdoner.png'

import mp3_file from '../../../lib/alert.wav'


class TableLiveOrder extends Component {
    constructor() {
        super()

        this.state = {
            orders: [],
            pagination_info: '',
            current_page: 1,
            is_orders_loaded: false,
            print_order: {},
            offices: [],
            is_offices_loaded: false,
            filters: {},
            play: false
        }
        this.loadOrders = this.loadOrders.bind(this)
        this.handleOnClickDelete = this.handleOnClickDelete.bind(this)
        this.handleOnClickChangeOrderStatus = this.handleOnClickChangeOrderStatus.bind(this)
        this.handleOnClickPrint = this.handleOnClickPrint.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.websocketOnMessage = this.websocketOnMessage.bind(this)

        this.client = new W3CWebSocket(process.env.REACT_APP_WS_URL);
        this.rap = {}
    }


    async componentWillReceiveProps(nextProps) {

        if (this.props.match != nextProps.match) {
            let params = {}
            if (nextProps.match.params.orderState) {
                params.order_status = nextProps.match.params.orderState
            }

            getOrders(this.state.current_page, params, (response) => {
                this.setState({
                    orders: response.data.docs,
                    pagination_info: response.data,
                    is_orders_loaded: true
                })
            })
        }
    }

    websocketOnMessage(message) {
        if (message.data == "ORDER_STATE_CHANGED") {
            this.rap.play()

            this.loadOrders()
        }


        if (message.data == "ORDER_CANCELLED") {
            Swal.fire({
                title: "Sipari?? iptal edildi",
                text: '??PTAL BEKLEYENLER sekmesinde g??rebilirsiniz',
                icon: 'info'
            })

            this.rap.play()

            this.loadOrders()
        }
    }

    async componentDidMount() {

        let params = {}
        if (this.props.params) {
            params = this.props.params
        }



        if (this.props.match) {
            params.order_status = this.props.match.params.orderState
        }

        const user = JSON.parse(localStorage.getItem('user'))
        if (user.user_type == "office_user") {
            params['order_office._id'] = user.user_office._id
        }



        await getOrders(this.state.current_page, params, (response) => {
            this.setState({
                orders: response.data.docs,
                pagination_info: response.data,
                is_orders_loaded: true
            })



            this.client.onmessage = (message) => {
                this.websocketOnMessage(message)
            };
        })

        getOffices(1, params, (response) => {
            this.setState({
                offices: response.data.docs,
                is_offices_loaded: true
            })
        })

        const interval = setInterval(() => {

            if (this.client.readyState != 1) {
                this.client = null
                this.client = new W3CWebSocket(process.env.REACT_APP_WS_URL);

                this.client.onmessage = (message) => {
                    this.websocketOnMessage(message)
                }
                // if (user.user_type == "office_user") {
                //     window.location.reload()
                // }
            }
        }, 5000);

    }

    loadOrders = (page = this.state.current_page, params = {}) => {

        if (this.props.params) {
            params = this.props.params
        }



        getOrders(page, params, async (response) => {



            this.setState({
                orders: response.data.docs,
                pagination_info: response.data,
                is_orders_loaded: true,
                current_page: page
            })
        })
    }

    async handleOnClickChangeOrderStatus(e) {
        const params = {
            'order_status': e.currentTarget.dataset.order_status
        }
        const submitResponse = await api.patch(`/orders/${e.currentTarget.dataset.order_id}`, params, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        if (submitResponse.data.status != 400) {
            Swal.fire({
                title: 'Kaydedildi',
                icon: 'success'
            })
            //this.loadOrders()
        } else {
            Swal.fire({
                title: 'Bir sorun olu??tu',
                icon: 'error'
            })
        }
    }

    async handleOnClickPrint(e) {
        let printOrder = {}
        this.state.orders.map((item) => {
            if (e.target.dataset.id == item._id) {
                printOrder = item
            }
        })

        await this.setState({
            print_order: printOrder
        }, () => {
            window.print()
        })
        await this.setState({
            print_order: {}
        })
    }

    handleOnClickDelete = (e) => {
        deleteObject(`/orders/${e.target.dataset.id}`, (response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Silindi",
                    icon: "success"
                })
                this.loadOrders(this.state.current_page)
            } else {
                Swal.fire({
                    title: "Bir sorun olu??tu",
                    icon: "error"
                })
            }
        })

    }


    handleOnChange(e) {
        if (e.target.name == "order_office._id" || e.target.name == "order_customer.customer_name") {

            let filtersState = this.state.filters
            filtersState[e.target.name] = e.target.value

            this.setState({
                filters: filtersState
            })
        }

    }


    handleOnSubmit(e) {
        e.preventDefault()


        this.loadOrders(1, this.state.filters)

    }


    render() {


        // render offices 
        let officesJsx = ''
        if (this.state.is_offices_loaded) {
            officesJsx = this.state.offices.map((item) => {
                return (
                    <option value={item._id}>{item.office_name}</option>
                )
            })
        }

        const user = JSON.parse(localStorage.getItem('user'))

        // render orders
        let ordersJsx = ''
        let cancelledOrderCount = 0
        if (this.state.is_orders_loaded) {
            ordersJsx = this.state.orders.map((item) => {
                console.log(item);
                if (item.order_status == "cancelled") {
                    cancelledOrderCount++
                }


                // render order status
                let orderStatusJsx = ''
                if (item.order_status == "pending") {
                    orderStatusJsx = <span className="badge badge-warning">Bekliyor</span>
                } else if (item.order_status == "preparing") {
                    orderStatusJsx = <span className="badge badge-info">Haz??rlan??yor</span>
                } else if (item.order_status == "on_delivery") {
                    orderStatusJsx = <span className="badge badge-danger">Yolda</span>
                } else if (item.order_status == "delivered") {
                    orderStatusJsx = <span className="badge badge-success">Teslim Edildi</span>
                } else if (item.order_status == "cancelled") {
                    orderStatusJsx = <span className="badge badge-danger"><i className="fas fa-times"></i> ??PTAL</span>
                } else if (item.order_status == "cancellation_approved") {
                    orderStatusJsx = <span className="badge badge-danger"><i className="fas fa-times"></i> ONAYLI ??PTAL</span>
                } else {
                    orderStatusJsx = <span className="badge badge-primary">Di??er</span>
                }

                // render order products
                let orderProductsJsx = ''
                orderProductsJsx = item.order_products.map((product) => {
                    let selectedProductPropertiesJsx = ''
                    selectedProductPropertiesJsx = product.selected_properties.map((selectedProductPropertyItem) => {
                        return (
                            <span>{selectedProductPropertyItem.property}</span>
                        )
                    })
                    return (
                        <>
                            <p>
                                <h2>
                                    {product.product_piece} x {product.product.product_name}

                                    {selectedProductPropertiesJsx}
                                </h2>
                            </p>


                        </>
                    )
                })

                // check user type ? if call_center user remove operation column
                let callCenterInfoFieldJsx = ''
                let customerNameJsx = ''
                let operationColumnJsx = (
                    <td>
                        <h2>
                            {item.order_date}
                            <span><i className="fas fa-user"></i> B***** ??*****</span>
                        </h2>
                    </td>
                )
                if (user.user_type == "office_user") {
                    customerNameJsx = (
                        item.order_customer.customer_name
                    )
                    let buttonGroupJsx = ''
                    if (item.order_status == "cancelled") {
                        buttonGroupJsx = (
                            <p>
                                <h6>??ptal Onay Bekliyor</h6>
                                <div class="btn-group btn-group-md">
                                    <button type="button" onClick={this.handleOnClickChangeOrderStatus} data-order_id={item._id} data-order_status="cancellation_approved" class="btn btn-danger">??ptali Onayla</button>
                                </div>
                            </p>
                        )
                    } else if (item.order_status == "cancellation_approved") {

                    } else {
                        buttonGroupJsx = (
                            <p>
                                <h6>Durumunu de??i??tir</h6>
                                <div class="btn-group btn-group-md">
                                    <button type="button" onClick={this.handleOnClickChangeOrderStatus} data-order_id={item._id} data-order_status="preparing" class="btn btn-primary">Haz??rlan??yor</button>
                                    <button type="button" onClick={this.handleOnClickChangeOrderStatus} data-order_id={item._id} data-order_status="on_delivery" class="btn btn-primary">Yolda</button>
                                    <button type="button" onClick={this.handleOnClickChangeOrderStatus} data-order_id={item._id} data-order_status="delivered" class="btn btn-primary">Teslim Edildi</button>
                                </div>
                            </p>
                        )
                    }
                    operationColumnJsx = (
                        <td>
                            <h2 className="float-right">
                                {item.order_date}
                                <span><i className="fas fa-user"></i> B***** ??*****</span>
                            </h2>
                            <button data-id={item._id} onClick={this.handleOnClickPrint} className="btn btn-outline-primary"><i className="fas fa-print"></i> Yazd??r</button>

                            {buttonGroupJsx}

                        </td>
                    )
                } else if (user.user_type == "call_center_user" || user.user_type == "super_user") {
                    customerNameJsx = (
                        <Link to={`${urls.CUSTOMER_RESULT_VIEW}/${item.order_customer._id}`}>{item.order_customer.customer_name}</Link>
                    )
                    callCenterInfoFieldJsx = (
                        <>
                            <p><i className="fas fa-user"></i> {item.order_user.user_name}</p>
                            <p><i className="fas fa-clock"></i> {item.order_date}</p>
                        </>
                    )
                    operationColumnJsx = (
                        <td>
                            <button data-id={item._id} onClick={this.handleOnClickChangeOrderStatus} data-order_id={item._id} data-order_status="cancelled" className="btn btn-outline-danger"><i className="fas fa-times"></i> ??ptal Et</button>
                        </td>
                    )
                }

                return (
                    <tr>
                        <td>{item.order_code}</td>
                        <td style={{ width: '30%' }}>
                            <p><strong>Ad Soyad: </strong>{customerNameJsx}</p>
                            <p><strong>Telefon: </strong>{item.order_customer.customer_phone_number}</p>
                            <p style={{ whiteSpace: 'pre-line' }}><strong>Adres: </strong>{item.order_address.address}</p>
                            <p>{item.order_address.address_description}</p>
                            {callCenterInfoFieldJsx}
                        </td>
                        <td className="product">{orderProductsJsx}</td>
                        <td>
                            {parseFloat(item.order_amount).toFixed(2)} ???
                            <p className="mx-0">{item.order_payment_method.payment_method_name}</p>
                        </td>
                        <td>{orderStatusJsx}</td>
                        <td className="order-note-field"><h2><span>{item.order_note}</span></h2></td>
                        {operationColumnJsx}
                    </tr>
                )
            })
        }


        // render filter tabs
        let filterTabsJsx = ''
        if (user.user_type == "office_user") {
            filterTabsJsx = (
                <div className="col-lg-12 mt-5">
                    <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
                        <li class="nav-item"><Link class="nav-link active" to={`${urls.LIVE_ORDER_VIEW}`} data-toggle="tab">T??m??</Link></li>
                        <li class="nav-item"><Link class="nav-link text-warning" to={`${urls.LIVE_ORDER_VIEW}/pending`} data-toggle="tab">Bekliyor</Link></li>
                        <li class="nav-item"><Link class="nav-link text-info" to={`${urls.LIVE_ORDER_VIEW}/preparing`} data-toggle="tab">Haz??rlan??yor</Link></li>
                        <li class="nav-item"><Link class="nav-link text-danger" to={`${urls.LIVE_ORDER_VIEW}/on_delivery`} data-toggle="tab">Yolda</Link></li>
                        <li class="nav-item"><Link class="nav-link text-success" to={`${urls.LIVE_ORDER_VIEW}/delivered`} data-toggle="tab">Teslim Edildi</Link></li>
                        <li class="nav-item"><Link class="nav-link text-danger" to={`${urls.LIVE_ORDER_VIEW}/cancelled`} data-toggle="tab"> ??PTAL BEKLEYENLER <span className="badge badge-danger">{cancelledOrderCount}</span></Link></li>
                    </ul>
                </div>
            )
        }
        if (this.state.print_order.order_code) {
            let dashes = (
                <>-----------------------------------------------------------------------------</>
            )

            let orderProductsJsx = this.state.print_order.order_products.map((item) => {
                let propertiesJsx = item.selected_properties.map((property) => {
                    return (
                        <p>-{property.property}</p>
                    )
                })

                let productAmount = parseInt(item.product_piece) * parseFloat(item.product.product_unit_price)
                return (
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td style={{ width: '80%' }}>
                                        <strong>{item.product_piece} X {item.product.product_name}</strong>
                                        <br></br>
                                        {propertiesJsx}
                                    </td>
                                    <td>
                                        <h2 style={{ fontSize: '3.5rem' }}>
                                            {productAmount} ???
                                        </h2>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })


            return (
                <>
                    <div className="row print" style={{ height: '400px' }}>
                        <div className="col-12">
                            <img src={hasdoner} width="300" style={{ marginLeft: '30%' }} />
                            <br></br>
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>

                                        <tr>
                                            <td>
                                                <strong>No: </strong>  {this.state.print_order.order_code}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Tarih: </strong>  {this.state.print_order.order_date}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>M????teri: </strong>  {this.state.print_order.order_customer.customer_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Telefon: </strong>  {this.state.print_order.order_customer.customer_phone_number}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>??deme: </strong>  {this.state.print_order.order_payment_method.payment_method_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Adres: </strong>
                                                {this.state.print_order.order_address.address}
                                                <br></br>
                                                {this.state.print_order.order_address.address_description}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Not: </strong>
                                                {this.state.print_order.order_note}
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                            {dashes}
                        </div>

                        <h3 style={{ marginLeft: '18%' }}>??r??nler</h3>
                        {orderProductsJsx}
                        <br></br>
                        {dashes}
                        <br></br>
                        {dashes}
                        <br></br>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td style={{ borderTop: 'none', textAlign: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold', fontSize: '5rem!important' }} id="total_amount">Toplam : {this.state.print_order.order_amount} ???</h2>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {dashes}
                        <br></br>
                        {dashes}
                    </div>
                    <div className="row">
                        <p style={{ marginLeft: '9%' }}>Bizi tercih etti??iniz i??in te??ekk??r ederiz</p>
                    </div>
                </>
            )
        } else {
            return (
                <div className="row">

                    <div className="col-lg-12">
                        <form className="form-inline d-flex justify-content-center py-3" onSubmit={this.handleOnSubmit}>
                            <div className="form-group">
                                <label>??ube</label>
                                <select className="form-control" name="order_office._id" onChange={this.handleOnChange}>
                                    <option value="" selected>??ube Se??iniz</option>
                                    {officesJsx}
                                </select>
                            </div>
                            <div className="form-group ml-3">
                                <label>M????teri Ad??</label>
                                <input className="form-control" name="order_customer.customer_name" placeholder="M????teri ad?? giriniz" onChange={this.handleOnChange} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary ml-2"><i className="fas fa-search"></i></button>

                            </div>

                        </form>

                    </div>
                    {filterTabsJsx}
                    <audio className="d-none" src={mp3_file} controls ref={(element) => { this.rap = element }} />
                    <div className="col-lg-12">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0 table-live-order">
                                <thead>
                                    <tr>
                                        <th>Kodu</th>
                                        <th>M????teri</th>
                                        <th>??r??n</th>
                                        <th>Tutar</th>
                                        <th>Durum</th>
                                        <th>Not</th>
                                        <th>????lem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordersJsx}
                                </tbody>
                            </table>
                            <Pagination object={this.state.pagination_info} onClick={this.loadOrders} />
                        </div>
                    </div>
                </div>

            )
        }

    }
}
export default TableLiveOrder