import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Swal from 'sweetalert2'
import { getCustomers } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'

class FormSearchCustomer extends Component {

    constructor() {
        super()

        this.state = {
            customer: '',
            customer_phone_number: '',
            is_customer_loaded: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }



    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleOnSubmit(e) {
        e.preventDefault()

        getCustomers(1, { 'customer_phone_number': this.state.customer_phone_number }, (results) => {
            this.setState({
                customer: results.data.docs,
                is_customer_loaded: true
            })
        })

    }


    render() {

        let redirectJsx = ''
        if (this.state.is_customer_loaded) {
            if (this.state.customer.length < 1) {
                redirectJsx = (
                    <Redirect to={`${urls.NEW_CUSTOMER_VIEW}/${this.state.customer_phone_number}`}></Redirect>
                )
            } else {
                redirectJsx = (
                    <Redirect to={`${urls.CUSTOMER_RESULT_VIEW}/${this.state.customer[0]._id}`}></Redirect>
                )
            }

            this.setState({
                is_customer_loaded: false
            })
        } else {

        }

        if (redirectJsx != '') {
            return (
                redirectJsx
            )
        } else {
            return (
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" class="form-control" name="customer_phone_number" onChange={this.handleOnChange} value={this.customer_phone_number} placeholder="Telefon numarası yazın" />
                    <button class="btn" type="submit"><i class="fas fa-search"></i></button>
                </form>
            )
        }


    }
}

export default FormSearchCustomer