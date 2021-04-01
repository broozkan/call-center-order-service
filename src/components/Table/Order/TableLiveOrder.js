import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getOrders } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TableLiveOrder extends Component {
    constructor() {
        super()

        this.state = {
            orders: [],
            pagination_info: '',
            current_page: 1,
            is_orders_loaded: false
        }

        this.loadOrders = this.loadOrders.bind(this)
        this.handleOnClickDelete = this.handleOnClickDelete.bind(this)
        this.handleOnClickChangeOrderStatus = this.handleOnClickChangeOrderStatus.bind(this)
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

    componentDidMount() {
        let params = {}
        if (this.props.params) {
            params = this.props.params
        }


        if (this.props.match) {
            params.order_status = this.props.match.params.orderState
        }

        getOrders(this.state.current_page, params, (response) => {
            this.setState({
                orders: response.data.docs,
                pagination_info: response.data,
                is_orders_loaded: true
            })
        })
    }

    loadOrders = (page = this.state.current_page) => {
        let params = {}
        if (this.props.params) {
            params = this.props.params
        }
        console.log(this.props.params);

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
            this.loadOrders()
        } else {
            Swal.fire({
                title: 'Bir sorun oluştu',
                icon: 'error'
            })
        }
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

    render() {

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
                            {item.order_created_at}
                            <span><i className="fas fa-user"></i> B***** Ö*****</span>
                        </h2>
                    </td>
                )
                if (user.user_type == "office_user") {
                    operationColumnJsx = (
                        <td>
                            <h2 className="float-right">
                                {item.order_created_at}
                                <span><i className="fas fa-user"></i> B***** Ö*****</span>
                            </h2>
                            <button data-id={item._id} onClick={this.handleOnClickDelete} className="btn btn-outline-primary"><i className="fas fa-print"></i> Yazdır</button>
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

        return (
            <div className="row">

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
export default TableLiveOrder