import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getCustomers } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TableCustomer extends Component {
    constructor() {
        super()

        this.state = {
            customers: [],
            pagination_info: '',
            current_page: 1,
            is_customers_loaded: false
        }

        this.loadCustomers = this.loadCustomers.bind(this)
    }

    componentDidMount() {
        getCustomers(this.state.current_page, {}, (response) => {
            this.setState({
                customers: response.data.docs,
                pagination_info: response.data,
                is_customers_loaded: true
            })
        })
    }

    loadCustomers = (page = this.state.current_page) => {
        getCustomers(page, {}, (response) => {
            this.setState({
                customers: response.data.docs,
                pagination_info: response.data,
                is_customers_loaded: true,
                current_page: page
            })
        })
    }


    handleOnClickDelete = (e) => {
        deleteObject(`/customers/${e.currentTarget.dataset.id}`, (response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Silindi",
                    icon: "success"
                })
                this.loadCustomers(this.state.current_page)
            } else {
                Swal.fire({
                    title: "Bir sorun oluştu",
                    icon: "error"
                })
            }
        })

    }

    render() {


        // render customers
        let customersJsx = ''
        if (this.state.is_customers_loaded) {
            customersJsx = this.state.customers.map((item) => {
                return (
                    <tr>
                        <td>{item.customer_name}</td>
                        <td>{item.customer_province}</td>
                        <td>{item.customer_note}</td>
                        <td>{item.customer_phone_number}</td>
                        <td>
                            <Link to={`${urls.UPDATE_CUSTOMER_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
                            <button data-id={item._id} onClick={this.handleOnClickDelete} className="btn btn-outline-primary btn-sm ml-2"><i className="fas fa-trash"></i> Sil</button>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div class="table-responsive">
                <div className="row">
                    <div className="col-lg-12">
                        <form method="POST" className="form-inline">

                        </form>

                    </div>

                </div>
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Şehir</th>
                            <th>Not</th>
                            <th>Telefon</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersJsx}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.loadCustomers} />
            </div>
        )
    }
}
export default TableCustomer