import React, { Component } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'

class FormPaymentMethod extends Component {

    constructor() {
        super()

        this.state = {
            payment_method_name: '',
            payment_method_order_priority_number: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getPaymentMethod = this.getPaymentMethod.bind(this)

    }

    componentDidMount() {
        if (this.props.payment_method_id) {
            this.getPaymentMethod()
        }
    }

    getPaymentMethod = async () => {
        const paymentMethod = await api.get('/payment-methods/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.props.payment_method_id } })

        this.setState(paymentMethod.data.docs[0])

    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleOnSubmit = async (e) => {
        e.preventDefault()

        let submitResponse = ''
        if (this.props.payment_method_id) {
            submitResponse = await api.put(`/payment-methods/${this.props.payment_method_id}`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/payment-methods`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.status == 200) {
            Swal.fire({
                title: "İşlem başarılı!",
                icon: "success"
            })
        } else {
            Swal.fire({
                title: "Hata",
                text: submitResponse.responseData,
                icon: "error"
            })
        }


    }


    render() {
        return (
            <form method="POST" onSubmit={this.handleOnSubmit}>
                <div class="form-group">
                    <label>Adı</label>
                    <input type="text" class="form-control" name="payment_method_name" value={this.state.payment_method_name} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Sıralama Önceliği</label>
                    <input type="number" class="form-control" name="payment_method_order_priority_number" value={this.state.payment_method_order_priority_number} onChange={this.handleOnChange} />
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                </div>
            </form>
        )
    }
}

export default FormPaymentMethod