import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getOrders } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TableOrder extends Component {
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

        let params = {}
        if (this.props.params) {
            params = this.props.params
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

        getOrders(page, params, (response) => {
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
                return (
                    <tr>
                        <td>{item.order_code}</td>
                        <td>{item.order_customer.customer_name}</td>
                        <td>{item.order_office.office_name}</td>
                        <td>{item.order_amount}</td>
                        <td>{item.order_status}</td>
                        <td>
                            <Link to={`${urls.UPDATE_ORDER_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
                            <button data-id={item._id} onClick={this.handleOnClickDelete} className="btn btn-outline-primary btn-sm ml-2"><i className="fas fa-trash"></i> Sil</button>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Kodu</th>
                            <th>Müşteri</th>
                            <th>Şube</th>
                            <th>Tutar</th>
                            <th>Durum</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersJsx}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.loadOrders} />
            </div>
        )
    }
}
export default TableOrder