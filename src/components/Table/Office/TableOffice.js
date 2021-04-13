import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getOffices } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TableOffice extends Component {
    constructor() {
        super()

        this.state = {
            offices: [],
            pagination_info: '',
            current_page: 1,
            is_offices_loaded: false
        }

        this.loadOffices = this.loadOffices.bind(this)
    }

    componentDidMount() {
        getOffices(this.state.current_page, {}, (response) => {
            this.setState({
                offices: response.data.docs,
                pagination_info: response.data,
                is_offices_loaded: true
            })
        })
    }

    loadOffices = (page = this.state.current_page) => {
        getOffices(page, {}, (response) => {
            this.setState({
                offices: response.data.docs,
                pagination_info: response.data,
                is_offices_loaded: true,
                current_page: page
            })
        })
    }


    handleOnClickDelete = (e) => {
        deleteObject(`/offices/${e.currentTarget.dataset.id}`, (response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Silindi",
                    icon: "success"
                })
                this.loadOffices(this.state.current_page)
            } else {
                Swal.fire({
                    title: "Bir sorun oluştu",
                    icon: "error"
                })
            }
        })

    }

    render() {


        // render offices
        let officesJsx = ''
        if (this.state.is_offices_loaded) {
            officesJsx = this.state.offices.map((item) => {
                return (
                    <tr>
                        <td>{item.office_name}</td>
                        <td>{item.office_province}</td>
                        <td>{item.office_address}</td>
                        <td>
                            <Link to={`${urls.UPDATE_OFFICE_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
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
                            <th>Şehri</th>
                            <th>Adresi</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {officesJsx}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.loadOffices} />
            </div>
        )
    }
}
export default TableOffice