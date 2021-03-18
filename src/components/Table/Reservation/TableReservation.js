import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getReservations } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TableReservation extends Component {
    constructor() {
        super()

        this.state = {
            reservations: [],
            pagination_info: '',
            current_page: 1,
            is_reservations_loaded: false
        }

        this.loadReservations = this.loadReservations.bind(this)
    }

    componentDidMount() {
        getReservations(this.state.current_page, {}, (response) => {
            this.setState({
                reservations: response.data.docs,
                pagination_info: response.data,
                is_reservations_loaded: true
            })
        })
    }

    loadReservations = (page = this.state.current_page) => {
        getReservations(page, {}, (response) => {
            this.setState({
                reservations: response.data.docs,
                pagination_info: response.data,
                is_reservations_loaded: true,
                current_page: page
            })
        })
    }


    handleOnClickDelete = (e) => {
        deleteObject(`/reservations/${e.target.dataset.id}`, (response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Silindi",
                    icon: "success"
                })
                this.loadReservations(this.state.current_page)
            } else {
                Swal.fire({
                    title: "Bir sorun oluştu",
                    icon: "error"
                })
            }
        })

    }

    render() {


        // render reservations
        let reservationsJsx = ''
        if (this.state.is_reservations_loaded) {
            reservationsJsx = this.state.reservations.map((item) => {
                return (
                    <tr>
                        <td>{item.reservation_code}</td>
                        <td>{item.reservation_customer.customer_name}</td>
                        <td>{item.reservation_office.office_name}</td>
                        <td>{item.reservation_date}</td>
                        <td>
                            <Link to={`${urls.UPDATE_RESERVATION_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
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
                            <th>Tarih</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservationsJsx}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.loadReservations} />
            </div>
        )
    }
}
export default TableReservation