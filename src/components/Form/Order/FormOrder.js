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
            order_address: {},
            offices: [],
            is_offices_loaded: false,
            products: [],
            is_products_loaded: false,
            order_amount: 0
        }

        this.handleOnClick = this.handleOnClick.bind(this)
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


    handleOnClick = (e) => {

        if (e.currentTarget.dataset.name === "order_address") {
            this.state.order_customer.customer_address.map((item) => {
                if (item._id == e.currentTarget.dataset.address_id) {
                    this.setState({
                        order_address: item
                    })
                }
            })
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
        let customersJsx = <LoaderSpin />
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
        }



        // render addresses
        let addressesJsx = <LoaderSpin />
        console.log(this.state);
        if (this.state.order_customer.customer_address) {
            addressesJsx = this.state.order_customer.customer_address.map((item) => {
                let activityClass = ''
                if (this.state.order_address._id == item._id) {
                    activityClass = 'active'
                }
                return (
                    <div className="col-lg-4">
                        <div onClick={this.handleOnClick} data-name="order_address" data-address_id={item._id} className={`card order-select-card ${activityClass}`}>
                            <div className="card-body">
                                <p> <i className="fas fa-map-marker-alt"></i> {item.address} <hr></hr> {item.address_province} <IconActiveCard /></p>
                            </div>
                        </div>
                    </div>

                )
            })
        }

        // render offices
        // let officeValue = ''
        // if (this.state.order_office._id) {
        //     officeValue = this.state.order_office._id
        // }
        // let officesJsx = <LoaderSpin />
        // if (this.state.is_offices_loaded) {
        //     officesJsx = this.state.offices.map((item) => {
        //         let activityClass = ''
        //         if (this.state.order_office._id == item._id) {
        //             activityClass = 'active'
        //         }
        //         return (
        //             <div className="col-lg-4">
        //                 <div onClick={this.handleOnClick} data-name="order_office" data-office_id={item._id} className={`card order-select-card ${activityClass}`}>
        //                     <div className="card-body">
        //                         <p> <i className="fas fa-map-marker-alt"></i> {item.office_name} <IconActiveCard /></p>
        //                     </div>
        //                 </div>
        //             </div>

        //         )
        //     })
        // }

        // render products
        let productsJsx = <LoaderSpin />
        if (this.state.is_products_loaded) {
            productsJsx = this.state.products.map((item) => {
                return (
                    <div className="col-lg-5">
                        <div className="card order-select-card" style={{ border: '1px solid lightgray' }}>
                            <div className="card-header">
                                <h5 className="card-title">{item.product_name}</h5>
                                <div className="btn-group btn-group-sm order-product-piece-field pt-3">
                                    <button type="button" className="btn btn-primary btn-xs">-</button>
                                    <input type="text" className="form-control form-control-xs" value="0" />
                                    <button type="button" className="btn btn-primary btn-xs">+</button>
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

                        <div className="form-group">
                            <label>Müşteri</label>
                            <div className="row">
                                {customersJsx}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Adresleri</label>
                            <div className="row">
                                {addressesJsx}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Ürünler</label>
                            <div className="accordion" id="accordionExample">
                                <div className="card order-select-card">
                                    <div className="card-header text-left" id="headingOne">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <h5 className="card-title ">Çorbalar</h5>
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body">
                                            Çorba ürünleri
                                    </div>
                                    </div>
                                </div>
                                <div className="card order-select-card">
                                    <div className="card-header text-left" id="headingTwo">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                <h5 className="card-title ">Ana Yemekler</h5>
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body">
                                            {productsJsx}

                                        </div>
                                    </div>
                                </div>
                                <div className="card order-select-card">
                                    <div className="card-header text-left" id="headingThree">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                <h5 className="card-title ">İçecekler</h5>
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body">
                                            d of them accusamus labore sustainable VHS.
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="form-group">
                            <label>Ana Yemekler</label>
                            <div className="row">
                                {productsJsx}
                            </div>
                        </div> */}
                        <div className="form-group">
                            <label>Toplam Tutar</label>
                            <input type="number" step=".01" className="form-control" name="order_amount" value={this.state.order_amount} onChange={this.handleOnClick} />
                        </div>

                        <div className="text-right">
                            <button type="submit" className="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
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