import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getOffices, getOrders } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import hasdoner from '../../../images/hasdoner.png'

const client = new W3CWebSocket(process.env.REACT_APP_WS_URL);

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
            filters: {}
        }

        this.loadOrders = this.loadOrders.bind(this)
        this.handleOnClickDelete = this.handleOnClickDelete.bind(this)
        this.handleOnClickChangeOrderStatus = this.handleOnClickChangeOrderStatus.bind(this)
        this.handleOnClickPrint = this.handleOnClickPrint.bind(this)
    }

    componentWillMount() {

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

            getOffices(1, params, (response) => {
                this.setState({
                    offices: response.data.docs,
                    is_offices_loaded: true
                })
            })
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

        await getOrders(this.state.current_page, params, (response) => {
            this.setState({
                orders: response.data.docs,
                pagination_info: response.data,
                is_orders_loaded: true
            })

            client.onopen = () => {
                console.log('WebSocket Client Connected');
                alert('WebSocket Client Connected');
            };

            client.onmessage = (message) => {
                console.log(message.data);
                if (message.data == "ORDER_STATE_CHANGED") {
                    this.loadOrders()
                }
            };
        })

    }

    loadOrders = (page = this.state.current_page) => {
        let params = {}
        if (this.props.params) {
            params = this.props.params
        }

        getOrders(page, params, (response) => {
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
                title: 'Bir sorun oluştu',
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
        })
        window.print()
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
                    title: "Bir sorun oluştu",
                    icon: "error"
                })
            }
        })

    }

    handleOnChange(e) {
        if (e.target.name == "office_id") {
            let filters = this.state.filters
            filters[e.target.name] = e.target.value

            this.setState({
                filters
            })
        }

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
        if (this.state.is_orders_loaded) {
            ordersJsx = this.state.orders.map((item) => {

                // render order status
                let orderStatusJsx = ''
                if (item.order_status == "pending") {
                    orderStatusJsx = <span className="badge badge-warning">Bekliyor</span>
                } else if (item.order_status == "preparing") {
                    orderStatusJsx = <span className="badge badge-info">Hazırlanıyor</span>
                } else if (item.order_status == "on_delivery") {
                    orderStatusJsx = <span className="badge badge-danger">Yolda</span>
                } else if (item.order_status == "delivered") {
                    orderStatusJsx = <span className="badge badge-success">Teslim Edildi</span>
                } else {
                    orderStatusJsx = <span className="badge badge-primary">Diğer</span>
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
                let operationColumnJsx = (
                    <td>
                        <h2>
                            {item.date_time}
                            <span><i className="fas fa-user"></i> B***** Ö*****</span>
                        </h2>
                    </td>
                )
                if (user.user_type == "office_user") {
                    operationColumnJsx = (
                        <td>
                            <h2 className="float-right">
                                {item.date_time}
                                <span><i className="fas fa-user"></i> B***** Ö*****</span>
                            </h2>
                            <button data-id={item._id} onClick={this.handleOnClickPrint} className="btn btn-outline-primary"><i className="fas fa-print"></i> Yazdır</button>
                            <p>
                                <h6>Durumunu değiştir</h6>
                                <div class="btn-group btn-group-md">
                                    <button type="button" onClick={this.handleOnClickChangeOrderStatus} data-order_id={item._id} data-order_status="preparing" class="btn btn-primary">Hazırlanıyor</button>
                                    <button type="button" onClick={this.handleOnClickChangeOrderStatus} data-order_id={item._id} data-order_status="on_delivery" class="btn btn-primary">Yolda</button>
                                    <button type="button" onClick={this.handleOnClickChangeOrderStatus} data-order_id={item._id} data-order_status="delivered" class="btn btn-primary">Teslim Edildi</button>
                                </div>
                            </p>
                        </td>
                    )
                }

                return (
                    <tr>
                        <td>{item.order_code}</td>
                        <td>
                            <p><strong>Ad Soyad: </strong>{item.order_customer.customer_name}</p>
                            <p><strong>Telefon: </strong>{item.order_customer.customer_phone_number}</p>
                            <p><strong>Adres: </strong>{item.order_address.address}</p>
                            <p>{item.order_address.address_description}</p>


                        </td>
                        <td className="product">{orderProductsJsx}</td>
                        <td>
                            {parseFloat(item.order_amount).toFixed(2)} ₺
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
                        <li class="nav-item"><Link class="nav-link active" to={`${urls.LIVE_ORDER_VIEW}`} data-toggle="tab">Tümü</Link></li>
                        <li class="nav-item"><Link class="nav-link text-warning" to={`${urls.LIVE_ORDER_VIEW}/pending`} data-toggle="tab">Bekliyor</Link></li>
                        <li class="nav-item"><Link class="nav-link text-info" to={`${urls.LIVE_ORDER_VIEW}/preparing`} data-toggle="tab">Hazırlanıyor</Link></li>
                        <li class="nav-item"><Link class="nav-link text-danger" to={`${urls.LIVE_ORDER_VIEW}/on_delivery`} data-toggle="tab">Yolda</Link></li>
                        <li class="nav-item"><Link class="nav-link text-success" to={`${urls.LIVE_ORDER_VIEW}/delivered`} data-toggle="tab">Teslim Edildi</Link></li>
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
                                    <td style={{ width: '35%' }}>
                                        <strong>{item.product_piece} X {item.product.product_name}</strong>
                                        <br></br>
                                        {propertiesJsx}
                                    </td>
                                    <td>
                                        <h2 style={{ fontSize: '20px' }}>
                                            {productAmount} ₺
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
                    <div className="row">
                        <div className="col-12">
                            <img src={hasdoner} width="80" style={{ marginLeft: '17%' }} />
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
                                                <strong>Tarih: </strong>  {this.state.print_order.date_time}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Müşteri: </strong>  {this.state.print_order.order_customer.customer_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Telefon: </strong>  {this.state.print_order.order_customer.customer_phone_number}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Ödeme: </strong>  {this.state.print_order.order_payment_method.payment_method_name}
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

                        <h3 style={{ marginLeft: '18%' }}>Ürünler</h3>
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
                                        <td style={{ borderTop: 'none' }}>
                                            <h2 style={{ fontSize: '40px', fontWeight: 'bold', marginLeft: '9%' }}>Toplam : {this.state.print_order.order_amount} ₺</h2>
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
                        <p style={{ marginLeft: '9%' }}>Bizi tercih ettiğiniz için teşekkür ederiz</p>
                    </div>
                </>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <form className="form-inline d-flex justify-content-center py-3">
                            <div className="form-group">
                                <label>Şube</label>
                                <select className="form-control" name="office_id" onChange={this.handleOnChange}>
                                    <option value="" selected>Şube Seçiniz</option>
                                    {officesJsx}
                                </select>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary ml-2"><i className="fas fa-search"></i></button>

                            </div>

                        </form>

                    </div>
                    {filterTabsJsx}
                    <div className="col-lg-12">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0 table-live-order">
                                <thead>
                                    <tr>
                                        <th>Kodu</th>
                                        <th>Müşteri</th>
                                        <th>Ürün</th>
                                        <th>Tutar</th>
                                        <th>Durum</th>
                                        <th>Not</th>
                                        <th>İşlem</th>
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