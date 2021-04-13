import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getEmployees } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TableEmployee extends Component {
    constructor() {
        super()

        this.state = {
            employees: [],
            pagination_info: '',
            current_page: 1,
            is_employees_loaded: false
        }

        this.loadEmployees = this.loadEmployees.bind(this)
    }

    componentDidMount() {
        getEmployees(this.state.current_page, {}, (response) => {
            this.setState({
                employees: response.data.docs,
                pagination_info: response.data,
                is_employees_loaded: true
            })
        })
    }

    loadEmployees = (page = this.state.current_page) => {
        getEmployees(page, {}, (response) => {
            this.setState({
                employees: response.data.docs,
                pagination_info: response.data,
                is_employees_loaded: true,
                current_page: page
            })
        })
    }


    handleOnClickDelete = (e) => {
        deleteObject(`/employees/${e.currentTarget.dataset.id}`, (response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Silindi",
                    icon: "success"
                })
                this.loadEmployees(this.state.current_page)
            } else {
                Swal.fire({
                    title: "Bir sorun oluştu",
                    icon: "error"
                })
            }
        })

    }

    render() {


        // render employees
        let employeesJsx = ''
        if (this.state.is_employees_loaded) {
            employeesJsx = this.state.employees.map((item) => {
                return (
                    <tr>
                        <td>{item.employee_name}</td>
                        <td>{item.employee_province}</td>
                        <td>{item.employee_email_address}</td>
                        <td>{item.employee_phone_number}</td>
                        <td>
                            <Link to={`${urls.UPDATE_EMPLOYEE_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
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
                            <th>Ad</th>
                            <th>Şehir</th>
                            <th>E-posta</th>
                            <th>Telefon</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesJsx}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.loadEmployees} />
            </div>
        )
    }
}
export default TableEmployee