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

    async componentWillReceiveProps(nextProps) {

        if (this.props.match != nextProps.match) {
            if (nextProps.match.params.availabilityState == "out-of-stock") {
                this.props.params.is_product_available = false
            } else if (nextProps.match.params.availabilityState == "on-stock") {
                this.props.params.is_product_available = true
            }

            console.log(this.props.params);
            getProducts(this.state.current_page, this.props.params, (response) => {
                this.setState({
                    products: response.data.docs,
                    pagination_info: response.data,
                    is_products_loaded: true
                })
            })
        }
    }

    componentDidMount() {

        if (this.props.match) {
            if (this.props.match.params.availabilityState == "out-of-stock") {
                this.props.params.is_product_available = false
            } else if (this.props.match.params.availabilityState == "on-stock") {
                this.props.params.is_product_available = true
            }
        }

        getProducts(this.state.current_page, this.props.params, (response) => {
            this.setState({
                products: response.data.docs,
                pagination_info: response.data,
                is_products_loaded: true
            })
        })
    }

    loadProducts = (page = this.state.current_page) => {
        if (this.props.match.params.availabilityState) {
            if (this.props.match.params.availabilityState == "out-of-stock") {
                this.props.params.is_product_available = false
            } else if (this.props.match.params.availabilityState == "on-stock") {
                this.props.params.is_product_available = true
            }
        }

        getProducts(page, this.props.params, (response) => {
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


    handleOnClickChangeAvailablity = async (e) => {
        const submitResponse = await api.patch(`/products/${e.currentTarget.dataset.id}`, { 'is_product_available': e.currentTarget.dataset.availability }, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        if (submitResponse.data.status != 400) {
            Swal.fire({
                title: 'Kaydedildi',
                icon: 'success'
            })
            this.loadProducts()
        } else {
            Swal.fire({
                title: 'Bir sorun oluştu',
                icon: 'error'
            })
        }
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'))

        // render products
        let productsJsx = ''
        if (this.state.is_products_loaded) {
            productsJsx = this.state.products.map((item) => {

                let operationColumnJsx = ''
                if (user.user_type == "office_user") {
                    if (item.is_product_available) {
                        operationColumnJsx = (
                            <td>
                                <button data-id={item._id} data-availability={false} onClick={this.handleOnClickChangeAvailablity} className="btn btn-outline-danger btn-sm ml-2"><i className="fas fa-times"></i> Stok Yok İşaretle</button>
                            </td>
                        )
                    } else {
                        operationColumnJsx = (
                            <td>
                                <button data-id={item._id} data-availability={true} onClick={this.handleOnClickChangeAvailablity} className="btn btn-outline-success btn-sm ml-2"><i className="fas fa-check"></i> Stok Var İşaretle</button>
                            </td>
                        )
                    }

                } else {
                    operationColumnJsx = (
                        <td>
                            <Link to={`${urls.UPDATE_PRODUCT_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
                            <button data-id={item._id} onClick={this.handleOnClickDelete} className="btn btn-outline-primary btn-sm ml-2"><i className="fas fa-trash"></i> Sil</button>
                        </td>
                    )

                }

                let currentStockJsx = ''
                if (item.is_product_available) {
                    currentStockJsx = (
                        <span disabled className="btn btn-outline-success btn-xs">Stokta Var <i className="fas fa-check-circle"></i></span>
                    )
                } else {
                    currentStockJsx = (
                        <span disabled className="btn btn-outline-danger btn-xs">Stokta Yok <i className="fas fa-check-times"></i></span>
                    )
                }

                return (
                    <tr>
                        <td>{item.product_name}</td>
                        <td>{item.product_category.category_name}</td>
                        <td>{item.product_unit}</td>
                        <td>{item.product_unit_price}</td>
                        <td>{currentStockJsx}</td>
                        {operationColumnJsx}
                    </tr>
                )
            })
        }

        // render filter tabs
        let filterTabsJsx = ''
        if (this.props.match.url == urls.OFFICE_MENU_VIEW || this.props.match.url == urls.OFFICE_MENU_VIEW_ON_STOCK || this.props.match.url == urls.OFFICE_MENU_VIEW_OUT_OF_STOCK) {
            filterTabsJsx = (
                <div className="col-lg-12 mt-5">
                    <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
                        <li class="nav-item"><Link class="nav-link active" to={`${urls.OFFICE_MENU_VIEW}`} data-toggle="tab">Tümü</Link></li>
                        <li class="nav-item"><Link class="nav-link text-success" to={`${urls.OFFICE_MENU_VIEW_ON_STOCK}`} data-toggle="tab">Stokta Var</Link></li>
                        <li class="nav-item"><Link class="nav-link text-danger" to={`${urls.OFFICE_MENU_VIEW_OUT_OF_STOCK}`} data-toggle="tab">Stokta Yok</Link></li>
                    </ul>
                </div>
            )
        }

        return (
            <div className="row">
                {filterTabsJsx}
                <div className="col-lg-12">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Ad</th>
                                    <th>Kategori</th>
                                    <th>Birim</th>
                                    <th>Birim Fiyat</th>
                                    <th>Stok Durumu</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsJsx}
                            </tbody>
                        </table>
                        <Pagination object={this.state.pagination_info} onClick={this.loadProducts} />
                    </div>
                </div>
            </div>

        )
    }
}
export default TableProduct