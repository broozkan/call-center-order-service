import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { getCustomers, getOffices, getProducts } from '../../../controllers/MainController'
import api from '../../../services/api'
import IconActiveCard from '../../Icon/IconActiveCard'
import LoaderSpin from '../../Loader/LoaderSpin'

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

    async componentWillReceiveProps(nextProps) {
        if (this.props.state != nextProps.state) {
            await this.setState(nextProps.state)
        }
    }

    componentDidMount() {
        if (this.props.order_id) {
            this.getOrder()
        }

        if (this.props.state) {
            this.setState(this.props.state)
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
        console.log(e.currentTarget.dataset);
        if (e.target.type === "select-one") {
            if (e.target.name === "order_customer") {
                this.state.customers.map((item) => {
                    if (item._id == e.target.value) {
                        this.setState({
                            order_customer: item
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
        } else {
            if (e.currentTarget.dataset.name === "order_office") {
                this.state.offices.map((item) => {
                    if (item._id == e.currentTarget.dataset.office_id) {
                        this.setState({
                            order_office: item
                        })
                    }
                })
            } else {
                this.setState({
                    [e.target.name]: e.target.value
                })
            }

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
        let customersJsx = <LoaderSpin />
        if (this.state.is_customers_loaded) {
            if (this.state.order_customer) {
                customersJsx = (
                    <div className="col-lg-12">
                        <div className="card order-select-card active">
                            <div className="card-body">
                                <p> <i className="fas fa-user"></i> {this.props.state.order_customer.customer_name} <IconActiveCard /> </p>
                            </div>
                        </div>
                    </div>
                )
            } else {
                customersJsx = this.state.customers.map((item, index) => {
                    return (
                        <div className="col-lg-4">
                            <div className="card order-select-card">
                                <div className="card-body">
                                    <p> <i className="fas fa-user"></i> {item.customer_name}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        }


        // render offices
        let officeValue = ''
        if (this.state.order_office._id) {
            officeValue = this.state.order_office._id
        }
        let officesJsx = <LoaderSpin />
        if (this.state.is_offices_loaded) {
            officesJsx = this.state.offices.map((item) => {
                let activityClass = ''
                if (this.state.order_office._id == item._id) {
                    activityClass = 'active'
                }
                return (
                    <div className="col-lg-4">
                        <div onClick={this.handleOnChange} data-name="order_office" data-office_id={item._id} className={`card order-select-card ${activityClass}`}>
                            <div className="card-body">
                                <p> <i className="fas fa-map-marker-alt"></i> {item.office_name} <IconActiveCard /></p>
                            </div>
                        </div>
                    </div>

                )
            })
        }

        // render products
        let productsJsx = <LoaderSpin />
        if (this.state.is_products_loaded) {
            productsJsx = this.state.products.map((item) => {
                return (
                    <div className="col-lg-4">
                        <div className="card order-select-card">
                            <div className="card-header">
                                <h5 class="card-title">{item.product_name}</h5>
                                <div class="btn-group btn-group-sm order-product-piece-field pt-3">
                                    <button type="button" class="btn btn-primary btn-xs">-</button>
                                    <input type="text" className="form-control form-control-xs" value="0" />
                                    <button type="button" class="btn btn-primary btn-xs">+</button>
                                </div>
                            </div>

                            <div className="card-body">
                                <button type="button" className="btn btn-outline-primary btn-xs m-1">Soğansız</button>
                                <button type="button" className="btn btn-outline-primary btn-xs m-1">Soğansız</button>
                                <button type="button" className="btn btn-outline-primary btn-xs m-1">Ketçaplı</button>
                                <button type="button" className="btn btn-outline-primary btn-xs m-1">Mayonezsiz Az Pişmiş</button>
                                <button type="button" className="btn btn-outline-primary btn-xs m-1">Soğansız</button>
                                <button type="button" className="btn btn-outline-primary btn-xs m-1">Soğansız</button>
                            </div>
                            <div className="card-footer">

                                <button className="btn btn-success btn-sm w-100">Sepete Ekle</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }


        return (
            <div className="row">
                <div className="col-lg-6">
                    <form method="POST" onSubmit={this.handleOnSubmit}>

                        <div class="form-group">
                            <label>Müşteri</label>
                            <div className="row">
                                {customersJsx}
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Şube</label>
                            <div className="row">
                                {officesJsx}
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Ana Yemekler</label>
                            <div className="row">
                                {productsJsx}
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Toplam Tutar</label>
                            <input type="number" step=".01" class="form-control" name="order_amount" value={this.state.order_amount} onChange={this.handleOnChange} />
                        </div>

                        <div class="text-right">
                            <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-6">

                </div>
            </div>

        )
    }
}

export default FormOrder