import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getProducts } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TableProduct extends Component {
    constructor() {
        super()

        this.state = {
            products: [],
            pagination_info: '',
            current_page: 1,
            is_products_loaded: false
        }

        this.loadProducts = this.loadProducts.bind(this)
    }

    componentDidMount() {
        getProducts(this.state.current_page, {}, (response) => {
            this.setState({
                products: response.data.docs,
                pagination_info: response.data,
                is_products_loaded: true
            })
        })
    }

    loadProducts = (page = this.state.current_page) => {
        getProducts(page, {}, (response) => {
            this.setState({
                products: response.data.docs,
                pagination_info: response.data,
                is_products_loaded: true,
                current_page: page
            })
        })
    }


    handleOnClickDelete = (e) => {
        deleteObject(`/products/${e.target.dataset.id}`, (response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Silindi",
                    icon: "success"
                })
                this.loadProducts(this.state.current_page)
            } else {
                Swal.fire({
                    title: "Bir sorun oluştu",
                    icon: "error"
                })
            }
        })

    }

    render() {


        // render products
        let productsJsx = ''
        if (this.state.is_products_loaded) {
            productsJsx = this.state.products.map((item) => {
                return (
                    <tr>
                        <td>{item.product_name}</td>
                        <td>{item.product_province}</td>
                        <td>{item.product_address}</td>
                        <td>{item.product_address_description}</td>
                        <td>{item.product_note}</td>
                        <td>{item.product_phone_number}</td>
                        <td>
                            <Link to={`${urls.UPDATE_PRODUCT_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
                            <button data-id={item._id} onClick={this.handleOnClickDelete} className="btn btn-outline-primary btn-sm ml-2"><i className="fas fa-trash"></i> Sil</button>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Şehir</th>
                            <th>Adres</th>
                            <th>Adres Tanımı</th>
                            <th>Not</th>
                            <th>Telefon</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsJsx}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.loadProducts} />
            </div>
        )
    }
}
export default TableProduct