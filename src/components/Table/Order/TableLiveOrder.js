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
    }

    componentDidMount() {
        getOrders(this.state.current_page, {}, (response) => {
            this.setState({
                orders: response.data.docs,
                pagination_info: response.data,
                is_orders_loaded: true
            })
        })
    }

    loadOrders = (page = this.state.current_page) => {
        getOrders(page, {}, (response) => {
            this.setState({
                orders: response.data.docs,
                pagination_info: response.data,
                is_orders_loaded: true,
                current_page: page
            })
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

    render() {


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
                    return (
                        <>
                            <p>
                                <h2>
                                    3 x {product.product_name}
                                    <span>Soğansız</span>
                                    <span>Yeşilliksiz</span>
                                    <span>Domatessiz</span>
                                </h2>
                            </p>


                        </>
                    )
                })

                return (
                    <tr>
                        <td>{item.order_code}</td>
                        <td>
                            <p><strong>Ad Soyad: </strong>{item.order_customer.customer_name}</p>
                            <p><strong>Telefon: </strong>{item.order_customer.customer_phone_number}</p>
                            <p><strong>Adres: </strong>{item.order_customer.customer_address}</p>
                            <p>{item.order_customer.customer_address_description}</p>


                        </td>
                        <td className="product">{orderProductsJsx}</td>
                        <td>{item.order_amount} TL</td>
                        <td>{orderStatusJsx}</td>
                        <td className="order-note-field"><h2><span>{item.order_note}</span></h2></td>
                        <td>
                            <h2 className="float-right">
                                {item.order_created_at}
                                <span><i className="fas fa-user"></i> B***** Ö*****</span>
                            </h2>
                            <button data-id={item._id} onClick={this.handleOnClickDelete} className="btn btn-outline-primary"><i className="fas fa-print"></i> Yazdır</button>
                            <p>
                                <h6>Durumunu değiştir</h6>
                                <div class="btn-group btn-group-md">
                                    <button type="button" class="btn btn-primary">Hazırlanıyor</button>
                                    <button type="button" class="btn btn-primary">Yolda</button>
                                    <button type="button" class="btn btn-primary">Teslim Edildi</button>
                                </div>
                            </p>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div className="row">
                <div className="col-lg-12 mt-5">
                    <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
                        <li class="nav-item"><a class="nav-link active" href="#bottom-justified-tab1" data-toggle="tab">Tümü</a></li>
                        <li class="nav-item"><a class="nav-link text-warning" href="#bottom-justified-tab2" data-toggle="tab">Bekliyor</a></li>
                        <li class="nav-item"><a class="nav-link text-warning" href="#bottom-justified-tab2" data-toggle="tab">Hazırlanıyor</a></li>
                        <li class="nav-item"><a class="nav-link text-danger" href="#bottom-justified-tab2" data-toggle="tab">Yolda</a></li>
                        <li class="nav-item"><a class="nav-link text-success" href="#bottom-justified-tab2" data-toggle="tab">Teslim Edildi</a></li>
                    </ul>
                </div>
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