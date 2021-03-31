import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { getCategories, getOffices } from '../../../controllers/MainController'
import api from '../../../services/api'

class FormProduct extends Component {

    constructor() {
        super()

        this.state = {
            product_name: '',
            product_category: {},
            product_office: {},
            product_unit: '',
            product_unit_price: '',
            offices: [],
            is_offices_loaded: false,
            product_photo: '',
            product_properties: [{
                property: '',
                property_additional_price: 0
            }],
            is_product_available: true,
            product_order_number: '',
            categories: [],
            is_categories_loaded: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getProduct = this.getProduct.bind(this)
        this.handleOnClickNewProperty = this.handleOnClickNewProperty.bind(this)
        this.handleOnClickDeleteProperty = this.handleOnClickDeleteProperty.bind(this)

    }

    componentDidMount() {
        if (this.props.product_id) {
            this.getProduct()
        }

        getCategories(1, {}, (results) => {
            this.setState({
                categories: results.data.docs,
                is_categories_loaded: true
            })
        })

        getOffices(1, {}, (results) => {
            this.setState({
                offices: results.data.docs,
                is_offices_loaded: true
            })
        })

    }

    getProduct = async () => {
        const product = await api.get('/products/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.props.product_id } })
        this.setState(product.data.docs[0])
    }


    handleOnChange = (e) => {

        if (e.target.type === "file") {
            this.setState({
                [e.target.name]: e.target.files[0]
            })
        } else if (e.target.name == "property" || e.target.name == "property_additional_price") {

            let productProperties = this.state.product_properties

            productProperties.map((item, index) => {
                if (index == e.target.dataset.index) {
                    item[e.target.name] = e.target.value
                }
            })

            this.setState({
                customer_address: productProperties
            })

        } else if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked
            })
        } else if (e.target.name === "product_category") {
            let productCategory = {}

            this.state.categories.map((item) => {
                if (item._id == e.target.value) {
                    productCategory = item
                }
            })

            this.setState({
                product_category: productCategory
            })
        } else if (e.target.name === "product_unit_prices") {
            let productUnitPrices = this.state.product_unit_prices
            productUnitPrices.map((item, index) => {
                if (e.target.dataset.index == index) {
                    item.unit_price = e.target.value
                }
            })

            this.setState({
                product_unit_prices: productUnitPrices
            })
        } else if (e.target.name === "product_office") {
            let productOffice = {}

            this.state.offices.map((item) => {
                if (item._id == e.target.value) {
                    productOffice = item
                }
            })

            this.setState({
                product_office: productOffice
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }



    handleOnClickNewProperty(e) {
        let productProperties = this.state.product_properties

        productProperties.push({
            property: '',
            property_additional_price: 0
        })

        this.setState({
            product_properties: productProperties
        })
    }

    handleOnClickDeleteProperty(e) {

        let productProperties = new Array()

        this.state.product_properties.map((item, index) => {
            if (index == e.currentTarget.dataset.index) {

            } else {
                productProperties.push(item)
            }
        })
        this.setState({
            product_properties: productProperties
        })
    }

    handleOnSubmit = async (e) => {
        e.preventDefault()

        console.log(this.state);
        let formData = new FormData()
        await formData.append('data', JSON.stringify(this.state))
        await formData.append('file', this.state.product_photo)


        let submitResponse = ''
        if (this.props.product_id) {
            submitResponse = await api.put(`/products/${this.props.product_id}`, formData, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/products`, formData, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
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
        // render offices
        let officesJsx = ''
        if (this.state.is_offices_loaded) {
            officesJsx = this.state.offices.map((item, index) => {
                return (
                    <>
                        <option value={item._id}>{item.office_name}</option>
                    </>
                )
            })
        }



        // render properties
        let propertiesJsx = this.state.product_properties.map((item, index) => {
            return (
                <div className="row py-1">
                    <div className="col-lg-7">
                        <label>Özellik Adı (Örn: Soğansız)</label>
                        <input type="text" class="form-control" required data-index={index} name="property" value={item.property} onChange={this.handleOnChange} placeholder="Özellik giriniz" />
                    </div>
                    <div className="col-lg-4">
                        <label>Özellik Ek Ücreti</label>
                        <input type="number" step=".01" class="form-control" required data-index={index} name="property_additional_price" value={item.property_additional_price} onChange={this.handleOnChange} placeholder="Özellik ek ücreti giriniz" />
                    </div>

                    <div className="col-lg-1">
                        <label>İşlem</label>
                        <button type="button" className="btn btn-danger" onClick={this.handleOnClickDeleteProperty} data-index={index}><i className="fas fa-trash"></i></button>
                    </div>
                </div>
            )
        })

        // render categories
        let categoriesJsx = ''
        if (this.state.is_categories_loaded) {
            categoriesJsx = this.state.categories.map((item) => {
                return (
                    <option value={item._id}>{item.category_name}</option>
                )
            })
        }

        return (
            <form method="POST" onSubmit={this.handleOnSubmit}>
                <div class="form-group">
                    <label>Adı *</label>
                    <input type="text" required class="form-control" name="product_name" value={this.state.product_name} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Kategorisi *</label>
                    <select className="form-control" name="product_category" value={this.state.product_category._id} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Kategori seçiniz</option>
                        {categoriesJsx}
                    </select>
                </div>
                <div class="form-group">
                    <label>Birimi *</label>
                    <select className="form-control" required name="product_unit" value={this.state.product_unit} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Birim seçiniz</option>
                        <option value="ADET">ADET</option>
                        <option value="KG">KG</option>
                        <option value="GRAM">GRAM</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Birim Fiyatı *</label>
                    <div className="form-group">
                        <input type="number" step=".01" className="form-control" name="product_unit_price" value={this.state.product_unit_price} onChange={this.handleOnChange} placeholder="Birim fiyatı giriniz" required />
                    </div>
                </div>
                <div class="form-group">
                    <label>Şubesi *</label>
                    <select className="form-control" name="product_office" value={this.state.product_office._id} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Şube seçiniz</option>
                        {officesJsx}
                    </select>
                </div>
                <div class="form-group">
                    <label>Görseli</label>
                    <input type="file" class="form-control" name="product_photo" onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label> Özellikleri *</label>
                    <button type="button" className="btn btn-sm btn-success ml-2" onClick={this.handleOnClickNewProperty}><i className="fas fa-plus"></i> Özellik Ekle</button>
                    {propertiesJsx}
                </div>
                <div className="form-group">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" className="mr-2" name="is_product_available" checked={this.state.is_product_available} onChange={this.handleOnChange} />
                                Stokta Var
						</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Sıralama Öncelik Numarası *</label>
                    <input type="number" required class="form-control" name="product_order_number" value={this.state.product_order_number} onChange={this.handleOnChange} />
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                </div>
            </form>
        )
    }
}

export default FormProduct