import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { getCustomers, getOffices, getProducts } from '../../../controllers/MainController'
import api from '../../../services/api'

class FormReservation extends Component {

    constructor() {
        super()

        this.state = {
            reservation_customer: {},
            reservation_office: {},
            reservation_date: '',
            customers: [],
            is_customers_loaded: false,
            offices: [],
            is_offices_loaded: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getReservation = this.getReservation.bind(this)

    }

    componentDidMount() {
        if (this.props.reservation_id) {
            this.getReservation()
        }

        getCustomers(1, {}, (results) => {
            this.setState({
                customers: results.data.docs,
                is_customers_loaded: true
            })
        })

        getOffices(1, {}, (results) => {
            this.setState({
                offices: results.data.docs,
                is_offices_loaded: true
            })
        })
    }

    getReservation = async () => {
        const reservation = await api.get('/reservations/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.props.reservation_id } })
        this.setState(reservation.data.docs[0])
    }


    handleOnChange = (e) => {

        console.log(e.target.type);
        if (e.target.type === "select-one") {
            if (e.target.name === "reservation_customer") {
                this.state.customers.map((item) => {
                    if (item._id == e.target.value) {
                        this.setState({
                            reservation_customer: item
                        })
                    }
                })
            } else if (e.target.name === "reservation_office") {
                this.state.offices.map((item) => {
                    if (item._id == e.target.value) {
                        this.setState({
                            reservation_office: item
                        })
                    }
                })
            }

        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

    }


    handleOnSubmit = async (e) => {
        e.preventDefault()


        let submitResponse = ''
        if (this.props.reservation_id) {
            submitResponse = await api.put(`/reservations/${this.props.reservation_id}`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/reservations`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }


        if (submitResponse.data.status != 400) {
            Swal.fire({
                title: "İşlem başarılı!",
                icon: "success"
            })
        } else {
            Swal.fire({
                title: "Hata",
                text: submitResponse.data.responseData,
                icon: "error"
            })
        }


    }


    render() {

        console.log(this.state);
        // render customers
        let customerValue = ''
        if (this.state.reservation_customer._id) {
            customerValue = this.state.reservation_customer._id
        }
        let customersJsx = <option value="" selected disabled>Müşteriler yükleniyor...</option>
        if (this.state.is_customers_loaded) {
            customersJsx = this.state.customers.map((item, index) => {
                return (
                    <option value={item._id}>{item.customer_name}</option>
                )
            })
        }


        // render offices
        let officeValue = ''
        if (this.state.reservation_office._id) {
            officeValue = this.state.reservation_office._id
        }
        let officesJsx = <option value="" selected disabled>Şubeler yükleniyor...</option>
        if (this.state.is_offices_loaded) {
            officesJsx = this.state.offices.map((item) => {
                return (
                    <option value={item._id}>{item.office_name}</option>
                )
            })
        }



        return (
            <form method="POST" onSubmit={this.handleOnSubmit}>

                <div class="form-group">
                    <label>Müşteri</label>
                    <select className="form-control" name="reservation_customer" value={customerValue} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Müşteri seçiniz</option>
                        {customersJsx}
                    </select>
                </div>
                <div class="form-group">
                    <label>Şube</label>
                    <select className="form-control" name="reservation_office" value={officeValue} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Şube seçiniz</option>
                        {officesJsx}
                    </select>
                </div>
                <div class="form-group">
                    <label>Tarih - Saat</label>
                    <input type="datetime-local" class="form-control" name="reservation_date" value={this.state.reservation_date} onChange={this.handleOnChange} />
                </div>

                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                </div>
            </form>
        )
    }
}

export default FormReservation