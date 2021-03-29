import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Swal from 'sweetalert2'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'

class FormCustomer extends Component {

    constructor() {
        super()

        this.state = {
            customer_id: '',
            customer_name: '',
            customer_province: '',
            customer_email_address: '',
            customer_phone_number: '',
            customer_address: '',
            customer_address_description: '',
            customer_note: '',
            redirect_jsx: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getCustomer = this.getCustomer.bind(this)

    }


    async componentWillReceiveProps(nextProps) {
        if (this.props.customer_id != nextProps.customer_id) {
            await this.setState({
                customer_id: nextProps.customer_id
            })

            this.getCustomer()
        }
    }

    async componentDidMount() {
        if (this.props.customer_id) {
            await this.setState({
                customer_id: this.props.customer_id
            })
            this.getCustomer()
        }


        if (this.props.state) {
            this.setState(this.props.state)
        }
    }

    getCustomer = async () => {

        const customer = await api.get('/customers/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.state.customer_id } })
        this.setState(customer.data.docs[0])

    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleOnSubmit = async (e) => {
        e.preventDefault()

        let submitResponse = ''
        if (this.props.customer_id) {
            submitResponse = await api.put(`/customers/${this.props.customer_id}`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/customers`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.data.status != 400) {
            Swal.fire({
                title: "İşlem başarılı!",
                icon: "success"
            })

            // redirect to customer detail view if user added customer via search on header
            if (this.props.state.customer_phone_number) {
                this.setState({
                    redirect_jsx: (
                        <Redirect to={`${urls.CUSTOMER_RESULT_VIEW}/${submitResponse.data.responseData._id}`}></Redirect>
                    )
                })
            }

        } else {
            Swal.fire({
                title: "Hata",
                text: submitResponse.data.responseData,
                icon: "error"
            })
        }


    }


    render() {
        if (this.state.redirect_jsx != '') {
            return (
                this.state.redirect_jsx
            )
        } else {
            return (
                <form method="POST" onSubmit={this.handleOnSubmit}>
                    {this.state.redirect_jsx}
                    <div class="form-group">
                        <label>Adı</label>
                        <input type="text" class="form-control" name="customer_name" value={this.state.customer_name} onChange={this.handleOnChange} />
                    </div>
                    <div class="form-group">
                        <label>Şehir</label>
                        <select className="form-control" name="customer_province" value={this.state.customer_province} onChange={this.handleOnChange}>
                            <option value="" selected disabled>Şehir Seçiniz</option>
                            <option value="Sivas">Sivas</option>
                            <option value="Kayseri">Kayseri</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Adres</label>
                        <input type="text" class="form-control" name="customer_address" value={this.state.customer_address} onChange={this.handleOnChange} />
                    </div>
                    <div class="form-group">
                        <label>Adres Tanımı</label>
                        <input type="text" class="form-control" name="customer_address_description" value={this.state.customer_address_description} onChange={this.handleOnChange} />
                    </div>
                    <div class="form-group">
                        <label>Not</label>
                        <input type="text" class="form-control" name="customer_note" value={this.state.customer_note} onChange={this.handleOnChange} />
                    </div>
                    <div class="form-group">
                        <label>Telefon Numarası</label>
                        <input type="number" class="form-control" name="customer_phone_number" value={this.state.customer_phone_number} onChange={this.handleOnChange} />
                    </div>

                    <div class="form-group">
                        <label>E-posta Adresi</label>
                        <input type="email" class="form-control" name="customer_email_address" value={this.state.customer_email_address} onChange={this.handleOnChange} />
                    </div>


                    <div class="text-right">
                        <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                    </div>
                </form>
            )
        }

    }
}

export default FormCustomer