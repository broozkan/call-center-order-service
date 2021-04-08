import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { getCategories, getOffices, getPaymentMethods, getProducts } from '../../../controllers/MainController'
import api from '../../../services/api'
import IconActiveCard from '../../Icon/IconActiveCard'
import LoaderSpin from '../../Loader/LoaderSpin'
const client = new W3CWebSocket(process.env.REACT_APP_WS_URL);

class FormOrder extends Component {

    constructor() {
        super()

        this.state = {
            order_customer: {},
            order_products: [],
            order_office: {},
            order_address: {},
            order_payment_method: {},
            order_amount: 0.00,
            order_note: '',
            order_product_piece: 1,
            offices: [],
            is_offices_loaded: false,
            products: [],
            is_products_loaded: false,
            is_products_loading: false,
            categories: [],
            is_categories_loaded: false,
            clicked_category_id: '',
            payment_methods: [],
            is_payment_methods_loaded: false,
            order_amount: 0
        }

        this.resetState = this.resetState.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleOnClickGetProducts = this.handleOnClickGetProducts.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getOrder = this.getOrder.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnClickIncreasePiece = this.handleOnClickIncreasePiece.bind(this)
        this.handleOnClickDecreasePiece = this.handleOnClickDecreasePiece.bind(this)
        this.handleOnClickNewOrderProduct = this.handleOnClickNewOrderProduct.bind(this)
        this.handleOnClickDeleteOrderProduct = this.handleOnClickDeleteOrderProduct.bind(this)
        this.handleOnClickToggleProductProperty = this.handleOnClickToggleProductProperty.bind(this)
        this.setOrderOffice = this.setOrderOffice.bind(this)
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.state != nextProps.state) {

            await this.setState(nextProps.state)
            await this.resetState()
        }

        if (this.state.order_customer.customer_address.length < 2) {
            await this.setState({
                order_address: this.state.order_customer.customer_address[0]
            })
            await this.setOrderOffice()
        } else {
            this.setState({
                order_office: {}
            })
        }


    }

    resetState() {
        this.setState({
            order_products: [],
            order_office: {},
            order_address: {},
            order_payment_method: {},
            order_amount: 0.00,
            order_note: '',
            order_product_piece: 1,
            clicked_category_id: '',
            order_amount: 0
        })
    }
    async componentDidMount() {
        if (this.props.order_id) {
            this.getOrder()
        }

        if (this.props.state) {
            await this.setState(this.props.state)
        }

        if (this.state.order_customer.customer_address) {
            if (this.state.order_customer.customer_address.length < 2) {
                await this.setState({
                    order_address: this.state.order_customer.customer_address[0]
                })
                this.setOrderOffice()
            }
        }


        getCategories(1, {}, (results) => {
            this.setState({
                categories: results.data.docs,
                is_categories_loaded: true
            })
        })

        getPaymentMethods(1, {}, (results) => {
            this.setState({
                payment_methods: results.data.docs,
                is_payment_methods_loaded: true
            })

            client.onopen = () => {
                console.log('WebSocket Client Connected');
                alert('WebSocket Client Connected');
            };

            client.onmessage = (message) => {
                if (message.data == "PRODUCT_STOCK_CHANGED") {
                    this.setState({
                        is_products_loading: true
                    })


                    getProducts(1, { 'product_category._id': this.state.clicked_category_id, 'product_office.office_province': this.state.order_address.address_province }, (results) => {
                        this.setState({
                            products: results.data.docs,
                            is_products_loaded: true,
                            is_products_loading: false
                        })
                    })
                }
            };
        })
    }

    getOrder = async () => {
        const order = await api.get('/orders/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.props.order_id } })
        this.setState(order.data.docs[0])
    }

    async setOrderOffice() {
        await getOffices(1, { 'office_province': this.state.order_address.address_province }, (results) => {
            this.setState({
                order_office: results.data.docs[0]
            })
        })


    }

    handleOnClick = async (e) => {


        if (e.currentTarget.dataset.name === "order_address") {
            await this.state.order_customer.customer_address.map(async (item) => {
                if (item._id == e.currentTarget.dataset.address_id) {
                    await this.setState({
                        order_address: item
                    })
                }
            })

            this.setOrderOffice()
        } else if (e.currentTarget.dataset.name === "order_payment_method") {
            this.state.payment_methods.map((item) => {
                if (item._id == e.currentTarget.dataset.payment_method_id) {
                    this.setState({
                        order_payment_method: item
                    })
                }
            })
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }


    async handleOnClickGetProducts(e) {

        if (!this.state.order_address._id) {
            Swal.fire({
                title: 'Lütfen önce adres seçiniz',
                icon: 'error'
            })

            return false
        }

        await this.setState({
            is_products_loading: true,
            clicked_category_id: e.currentTarget.dataset.id
        })


        getProducts(1, { 'product_category._id': this.state.clicked_category_id, 'product_office.office_province': this.state.order_address.address_province }, (results) => {
            this.setState({
                products: results.data.docs,
                is_products_loaded: true,
                is_products_loading: false
            })
        })
    }


    handleOnSubmit = async (e) => {
        e.preventDefault()

        if (!this.state.order_payment_method.payment_method_name) {
            Swal.fire({
                title: 'Lütfen ödeme yöntemi seçiniz',
                icon: 'error'
            })
            return false
        }

        if (this.state.order_products.length < 1) {
            Swal.fire({
                title: 'Ürün seçimi yapmalısınız',
                icon: 'error'
            })
            return false
        }

        const data = {
            order_customer: this.state.order_customer,
            order_address: this.state.order_address,
            order_amount: this.state.order_amount,
            order_payment_method: this.state.order_payment_method,
            order_products: this.state.order_products,
            order_customer: this.state.order_customer,
            order_office: this.state.order_office,
            order_note: this.state.order_note
        }

        let submitResponse = ''
        if (this.props.order_id) {
            submitResponse = await api.put(`/orders/${this.props.order_id}`, data, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/orders`, data, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.data.status != 400) {
            Swal.fire({
                title: "İşlem başarılı!",
                icon: "success"
            })
            this.resetState()
        } else {
            Swal.fire({
                title: "Hata",
                text: submitResponse.data.responseData,
                icon: "error"
            })
        }


    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnClickNewOrderProduct(e) {
        if (e.currentTarget.dataset.is_product_available == 'false') {
            return false
        }
        let orderProducts = this.state.order_products

        this.state.products.map((item) => {
            if (item._id == e.currentTarget.dataset.product_id) {

                orderProducts.push({
                    product: item,
                    product_piece: 1,
                    unique_id: Math.floor(Math.random() * 1000),
                    selected_properties: []
                })
            }
        })

        console.log(orderProducts);
        this.setState({
            order_products: orderProducts
        })
    }

    handleOnClickIncreasePiece(e) {

        let orderProducts = this.state.order_products

        orderProducts.map((item) => {
            if (item.unique_id == e.currentTarget.dataset.unique_id) {
                item.product_piece++
            }
        })

        this.setState({
            order_products: orderProducts
        })
    }

    handleOnClickDecreasePiece(e) {
        let orderProducts = this.state.order_products

        orderProducts.map((item) => {
            if (item._id == e.currentTarget.dataset.product_id) {
                if (item.product_piece == 1) {
                    return false
                }
                item.product_piece--
            }

        })

        this.setState({
            order_products: orderProducts
        })
    }

    handleOnClickDeleteOrderProduct(e) {
        let orderProducts = new Array()

        this.state.order_products.map((item, index) => {
            if (index != e.currentTarget.dataset.index) {
                orderProducts.push(item)
            }
        })

        this.setState({
            order_products: orderProducts
        })
    }

    handleOnClickToggleProductProperty(e) {
        let orderProducts = this.state.order_products

        orderProducts.map((item) => {
            let selectedProperties = [...item.selected_properties]

            if (e.currentTarget.dataset.unique_id == item.unique_id) {
                item.product.product_properties.map((productPropertyItem, index) => {
                    if (e.currentTarget.dataset.index == index) {
                        console.log(productPropertyItem.property)
                        if (e.currentTarget.dataset.is_added == 'false') {
                            selectedProperties.push(productPropertyItem);
                        } else {
                            selectedProperties.map((selectedProperty, selectedPropertyIndex) => {
                                if (selectedProperty.property == productPropertyItem.property) {
                                    selectedProperties.splice(selectedPropertyIndex, 1);
                                }
                            })
                        }
                    }
                })
            }
            item.selected_properties = selectedProperties
        })

        this.setState({
            order_products: orderProducts
        })

    }

    render() {
        console.log(this.state);
        // render customers
        let customersJsx = <LoaderSpin />
        if (this.state.order_customer) {
            customersJsx = (
                <div className="col-lg-3">
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
        if (this.state.order_customer.customer_address) {

            addressesJsx = this.state.order_customer.customer_address.map((item) => {
                let activityClass = ''
                if (this.state.order_address._id == item._id) {
                    activityClass = 'active'
                }
                return (
                    <div className="col-lg-3">

                        <div onClick={this.handleOnClick} data-name="order_address" data-address_id={item._id} className={`card order-select-card address ${activityClass}`}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12 address-field">
                                        <p> <i className="fas fa-map-marker-alt"></i> {item.address}  </p>
                                    </div>
                                </div>

                                <span>Minimum paket tutarı : {parseFloat(item.address_minimum_amount).toFixed(2)} ₺</span>
                                <p>{item.address_province} <IconActiveCard /></p>
                            </div>
                            <div className="card-footer text-muted text-uppercase">
                            </div>
                        </div>


                    </div>

                )
            })
        }


        // render categories
        let categoriesJsx = <LoaderSpin />
        if (this.state.is_categories_loaded) {
            categoriesJsx = this.state.categories.map((item) => {
                return (
                    <button type="button" onClick={this.handleOnClickGetProducts} data-id={item._id} className="btn btn-primary">{item.category_name}</button>
                )
            })
        }

        // render products
        let productsJsx = (
            <div className="col-lg-12 mt-5">
                <h5 className="text-center text-muted mt-5">Kategori seçiniz</h5>
            </div>
        )
        if (this.state.is_products_loading) {
            productsJsx = <LoaderSpin />
        } else {
            if (this.state.is_products_loaded) {
                productsJsx = this.state.products.map((item) => {
                    let stockClass = ''
                    let outOfStockJsx = ''
                    if (item.is_product_available == false) {
                        stockClass = 'out-of-stock'
                        outOfStockJsx = (
                            <span className="badge badge-danger">Stok Yok</span>
                        )
                    }

                    return (
                        <div className={`col-lg-3 product ${stockClass}`} data-is_product_available={item.is_product_available} data-product_id={item._id} onClick={this.handleOnClickNewOrderProduct}>
                            <span className="badge badge-warning">{item.product_unit_price} ₺</span>
                            {outOfStockJsx}
                            <label>{item.product_name}</label>
                            <img src={`${process.env.REACT_APP_API_ENDPOINT}files/${item.product_photo.name}`} className="img-fluid" />
                        </div>
                    )
                })
            }
        }

        // render order products
        let orderProductsJsx = ''
        this.state.order_amount = 0
        if (this.state.order_products.length > 0) {
            orderProductsJsx = this.state.order_products.map((item, index) => {
                let productPropertiesJsx = ''
                let orderProductAdditionalPrice = 0
                productPropertiesJsx = item.product.product_properties.map((propertyItem, propertyIndex) => {

                    let checkedIconJsx = ''
                    let activityClass = ''
                    let is_added = false
                    item.selected_properties.map((selectedPropertiesItem) => {
                        if (selectedPropertiesItem.property == propertyItem.property) {
                            orderProductAdditionalPrice += parseFloat(propertyItem.property_additional_price) * item.product_piece
                            checkedIconJsx = <i className="fas fa-check-circle text-warning"></i>
                            activityClass = 'selected'
                            is_added = true
                        }
                    })

                    let propertyTextJsx = propertyItem.property
                    if (propertyItem.property_additional_price > 0) {
                        propertyTextJsx = `${propertyTextJsx}+${propertyItem.property_additional_price}₺`
                    }
                    return (
                        <button type="button" className={`btn btn-xs product-property-button btn-outline-primary ${activityClass}`} onClick={this.handleOnClickToggleProductProperty} data-unique_id={item.unique_id} data-is_added={is_added} data-index={propertyIndex}>
                            {propertyTextJsx} {checkedIconJsx}
                        </button>
                    )
                })

                this.state.order_amount += (parseFloat(item.product.product_unit_price) * parseInt(item.product_piece) + orderProductAdditionalPrice)
                return (
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-1">
                                        <div className="avatar avatar-sm">
                                            <img className="avatar-img rounded-circle" alt="User Image" src={`${process.env.REACT_APP_API_ENDPOINT}files/${item.product.product_photo.name}`} />
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <h5 className="card-title text-center">{item.product.product_name} - {item.product.product_unit}</h5>

                                    </div>
                                    <div className="col-lg-2 align-center">
                                        <h5>{(parseFloat(item.product.product_unit_price) * parseInt(item.product_piece) + orderProductAdditionalPrice).toFixed(2)} ₺</h5>
                                    </div>
                                    <div className="col-lg-2  align-center">
                                        <div className="btn-group">
                                            <button type="button" onClick={this.handleOnClickDecreasePiece} data-unique_id={item.unique_id} className="btn btn-primary btn-sm">-</button>
                                            <input className="form-control" min="1" name="product_piece" placeholder="Adet" value={item.product_piece} />
                                            <button type="button" onClick={this.handleOnClickIncreasePiece} data-unique_id={item.unique_id} className="btn btn-primary btn-sm">+</button>
                                        </div>
                                    </div>

                                    <div className="col-lg-2  align-center">
                                        <button type="button" data-index={index} onClick={this.handleOnClickDeleteOrderProduct} className="btn btn-sm w-100 btn-danger"><i className="fas fa-trash"></i></button>
                                    </div>

                                </div>

                            </div>
                            <div className="card-body">
                                {productPropertiesJsx}
                            </div>
                        </div>
                    </div>
                )
            })
        }


        // render payment methods
        let paymentMethodsJsx = ''
        if (this.state.is_payment_methods_loaded) {
            paymentMethodsJsx = this.state.payment_methods.map((item) => {
                let checkedIconJsx = ''
                let activityClass = ''
                if (this.state.order_payment_method.payment_method_name == item.payment_method_name) {
                    checkedIconJsx = <IconActiveCard />
                    activityClass = 'active'
                }
                return (
                    <div className="col-lg-4">
                        <div onClick={this.handleOnClick} data-name="order_payment_method" data-payment_method_id={item._id} className={`card order-select-card ${activityClass}`}>
                            <div className="card-body">
                                <p> <i className="fas fa-money-bill"></i> {item.payment_method_name} {checkedIconJsx}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }



        return (
            <>
                <div className="row">
                    <div className="col-lg-12">
                        <form method="POST" onSubmit={this.handleOnSubmit}>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Adresleri</label>
                                        <div className="row">
                                            {addressesJsx}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Ürünler</label>
                                        <div className="row">
                                            <div className="col-lg-12" id="categories">
                                                {categoriesJsx}
                                            </div>
                                            <div className="col-lg-12 products-column">
                                                <div className="row">
                                                    {productsJsx}
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group mt-4">
                                                    <div className="row" id="order-payment-methods-column">
                                                        {paymentMethodsJsx}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <div className="form-group">
                                                        <label>Sipariş Notu</label>
                                                        <input className="form-control" name="order_note" onChange={this.handleOnChange} value={this.state.order_note} placeholder="Sipariş notu giriniz" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group mb-0">
                                                    <h3>Toplam Tutar: {this.state.order_amount.toFixed(2)} ₺</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Sipariş İçeriği</label>
                                        <div className="row" id="order-products-column">
                                            {orderProductsJsx}
                                        </div>
                                    </div>
                                </div>
                            </div>




                            {/* <div className="row" id="order-total-band">
                                <div className="float-right">
                                    <h4 className="text-white text-right">170.00 ₺</h4>

                                </div>
                            </div> */}
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg"><i className="fas fa-save"></i> Gönder</button>
                                <button type="button" className="btn btn-outline-danger ml-2 btn-lg" onClick={this.resetState}><i className="fas fa-times"></i> İptal</button>
                            </div>
                        </form>

                    </div>
                </div>

            </>
        )
    }
}

export default FormOrder