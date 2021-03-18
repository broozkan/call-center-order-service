import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { getCustomers, getOffices, getProducts } from '../../../controllers/MainController'
import api from '../../../services/api'

class FormOrder extends Component {

    constructor() {
        super()

        this.state = {
            order_customer: {},
            order_products: [],
            order_office: {},
            customers: [],
            is_customers_loaded: false,
            offices: [],
            is_offices_loaded: false,
            products: [],
            is_products_loaded: false,
            order_amount: 0
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getOrder = this.getOrder.bind(this)

    }

    componentDidMount() {
        if (this.props.order_id) {
            this.getOrder()
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

        getProducts(1, {}, (results) => {
            this.setState({
                products: results.data.docs,
                is_products_loaded: true
            })
        })
    }

    getOrder = async () => {
        const order = await api.get('/orders/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.props.order_id } })
        this.setState(order.data.docs[0])
    }


    handleOnChange = (e) => {

        console.log(e.target.type);
        if (e.target.type === "select-one") {
            if (e.target.name === "order_customer") {
                this.state.customers.map((item) => {
                    if (item._id == e.target.value) {
                        this.setState({
                            order_customer: item
                        })
                    }
                })
            } else if (e.target.name === "order_office") {
                this.state.offices.map((item) => {
                    if (item._id == e.target.value) {
                        this.setState({
                            order_office: item
                        })
                    }
                })
            }

        } else if (e.target.type === "select-multiple") {
            let orderProducts = this.state.order_products
            for (let index = 0; index < e.target.options.length; index++) {
                this.state.products.map((item) => {
                    if (e.target.options[index].selected) {
                        if (item._id == e.target.options[index].value) {
                            orderProducts.push(item)
                        }
                    } else {
                        if (item._id == e.target.options[index].value) {
                            orderProducts.splice(index, 1)
                        }
                    }
                })
            }
            this.setState({
                order_products: orderProducts
            })
            console.log(e.target.options[1].selected);
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

    }


    handleOnSubmit = async (e) => {
        e.preventDefault()


        let submitResponse = ''
        if (this.props.order_id) {
            submitResponse = await api.put(`/orders/${this.props.order_id}`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/orders`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
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
        if (this.state.order_customer._id) {
            customerValue = this.state.order_customer._id
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
        if (this.state.order_office._id) {
            officeValue = this.state.order_office._id
        }
        let officesJsx = <option value="" selected disabled>Şubeler yükleniyor...</option>
        if (this.state.is_offices_loaded) {
            officesJsx = this.state.offices.map((item) => {
                return (
                    <option value={item._id}>{item.office_name}</option>
                )
            })
        }

        // render products
        let productsJsx = <option value="" selected disabled>Ürünler yükleniyor...</option>
        if (this.state.is_products_loaded) {
            productsJsx = this.state.products.map((item) => {
                return (
                    <option value={item._id}>{item.product_name}</option>
                )
            })
        }


        return (
            <form method="POST" onSubmit={this.handleOnSubmit}>

                <div class="form-group">
                    <label>Müşteri</label>
                    <select className="form-control" name="order_customer" value={customerValue} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Müşteri seçiniz</option>
                        {customersJsx}
                    </select>
                </div>
                <div class="form-group">
                    <label>Şube</label>
                    <select className="form-control" name="order_office" value={officeValue} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Şube seçiniz</option>
                        {officesJsx}
                    </select>
                </div>
                <div class="form-group">
                    <label>Ürünler</label>
                    <select multiple className="form-control" name="order_products" value={this.state.order_products} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Ürünler seçiniz</option>
                        {productsJsx}
                    </select>
                </div>
                <div class="form-group">
                    <label>Toplam Tutar</label>
                    <input type="number" step=".01" class="form-control" name="order_amount" value={this.state.order_amount} onChange={this.handleOnChange} />
                </div>

                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                </div>
            </form>
        )
    }
}

export default FormOrder