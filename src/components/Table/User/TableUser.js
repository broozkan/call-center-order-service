import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getUsers } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TableUser extends Component {
    constructor() {
        super()

        this.state = {
            users: [],
            pagination_info: '',
            current_page: 1,
            is_users_loaded: false
        }

        this.loadUsers = this.loadUsers.bind(this)
    }

    componentDidMount() {
        getUsers(this.state.current_page, {}, (response) => {
            this.setState({
                users: response.data.docs,
                pagination_info: response.data,
                is_users_loaded: true
            })
        })
    }

    loadUsers = (page = this.state.current_page) => {
        getUsers(page, {}, (response) => {
            this.setState({
                users: response.data.docs,
                pagination_info: response.data,
                is_users_loaded: true,
                current_page: page
            })
        })
    }


    handleOnClickDelete = (e) => {
        deleteObject(`/users/${e.currentTarget.dataset.id}`, (response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Silindi",
                    icon: "success"
                })
                this.loadUsers(this.state.current_page)
            } else {
                Swal.fire({
                    title: "Bir sorun oluştu",
                    icon: "error"
                })
            }
        })

    }

    render() {


        // render users
        let usersJsx = ''
        if (this.state.is_users_loaded) {
            usersJsx = this.state.users.map((item) => {
                return (
                    <tr>
                        <td>{item.user_name}</td>
                        <td>{item.user_province}</td>
                        <td>{item.user_email_address}</td>
                        <td>{item.user_phone_number}</td>
                        <td>
                            <Link to={`${urls.UPDATE_USER_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
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
                        {usersJsx}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.loadUsers} />
            </div>
        )
    }
}
export default TableUser