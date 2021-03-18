import React, { Component } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'

class FormProduct extends Component {

    constructor() {
        super()

        this.state = {
            product_name: '',
            product_unit: '',
            product_unit_price: '',
            product_photo: '',
            is_product_available: true,
            product_order_number: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getProduct = this.getProduct.bind(this)

    }

    componentDidMount() {
        if (this.props.product_id) {
            this.getProduct()
        }
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
        } else if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

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
        return (
            <form method="POST" onSubmit={this.handleOnSubmit}>
                <div class="form-group">
                    <label>Adı</label>
                    <input type="text" class="form-control" name="product_name" value={this.state.product_name} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Birimi</label>
                    <select className="form-control" name="product_unit" value={this.state.product_unit} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Birim seçiniz</option>
                        <option value="ADET">ADET</option>
                        <option value="KG">KG</option>
                        <option value="GRAM">GRAM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Birim Başı Fiyatı</label>
                    <input type="number" step=".01" class="form-control" name="product_unit_price" value={this.state.product_unit_price} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Görseli</label>
                    <input type="file" class="form-control" name="product_photo" onChange={this.handleOnChange} />
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
                    <label>Sıralama Öncelik Numarası</label>
                    <input type="number" class="form-control" name="product_order_number" value={this.state.product_order_number} onChange={this.handleOnChange} />
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                </div>
            </form>
        )
    }
}

export default FormProduct