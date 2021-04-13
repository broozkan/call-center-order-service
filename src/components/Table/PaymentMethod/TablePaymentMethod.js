import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getPaymentMethods } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TablePaymentMethod extends Component {
    constructor() {
        super()

        this.state = {
            payment_methods: [],
            pagination_info: '',
            current_page: 1,
            is_payment_methods_loaded: false
        }

        this.loadPaymentMethods = this.loadPaymentMethods.bind(this)
    }

    componentDidMount() {
        getPaymentMethods(this.state.current_page, {}, (response) => {
            this.setState({
                payment_methods: response.data.docs,
                pagination_info: response.data,
                is_payment_methods_loaded: true
            })
        })
    }

    loadPaymentMethods = (page = this.state.current_page) => {
        getPaymentMethods(page, {}, (response) => {
            this.setState({
                payment_methods: response.data.docs,
                pagination_info: response.data,
                is_payment_methods_loaded: true,
                current_page: page
            })
        })
    }


    handleOnClickDelete = (e) => {
        deleteObject(`/payment-methods/${e.currentTarget.dataset.id}`, (response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Silindi",
                    icon: "success"
                })
                this.loadPaymentMethods(this.state.current_page)
            } else {
                Swal.fire({
                    title: "Bir sorun oluştu",
                    icon: "error"
                })
            }
        })

    }

    render() {


        // render payment_methods
        let payment_methodsJsx = ''
        if (this.state.is_payment_methods_loaded) {
            payment_methodsJsx = this.state.payment_methods.map((item) => {
                return (
                    <tr>
                        <td>{item.payment_method_name}</td>
                        <td>{item.payment_method_order_priority_number}</td>
                        <td>
                            <Link to={`${urls.UPDATE_PAYMENT_METHOD_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
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
                            <th>Adı</th>
                            <th>Sıralama Önceliği</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment_methodsJsx}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.loadPaymentMethods} />
            </div>
        )
    }
}
export default TablePaymentMethod