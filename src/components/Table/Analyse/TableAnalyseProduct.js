import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getCustomers, getOffices } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import LoaderSpin from '../../Loader/LoaderSpin'
import Pagination from '../../Pagination/Pagination'


class TableAnalyseProduct extends Component {
    constructor() {
        super()

        this.state = {
            product_analyses: [],
            filters: {},
            is_product_analyses_loaded: false,
            is_form_submitting: false,
            offices: [],
            is_offices_loaded: false
        }

        this.loadAnalyses = this.loadAnalyses.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnClickStockDate = this.handleOnClickStockDate.bind(this)
    }


    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        let params = {}
        let filters = {}

        if (user.user_type == "office_user") {
            params = { '_id': user.user_office._id }
            filters["order_office._id"] = user.user_office._id
        }

        await getOffices(1, params, (results) => {
            this.setState({
                offices: results.data.docs,
                is_offices_loaded: true,
                filters: filters
            })

        })
    }

    loadAnalyses = async () => {

        const filters = this.state.filters
        filters["product_analyses"] = "1"

        const analyses = await api.get('/analyse', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: filters })

        this.setState({
            product_analyses: analyses.data.docs,
            is_form_submitting: true,
            is_product_analyses_loaded: true
        })
    }

    handleOnChange(e) {


        let filters = this.state.filters

        if (e.target.name === "order_office._id") {
            this.state.offices.map((item) => {
                if (item._id == e.target.value) {
                    filters["order_office._id"] = item._id
                }
            })
            this.setState({
                filters
            })
        } else {
            filters[e.target.name] = e.target.value
            this.setState({
                filters
            })
        }

    }

    handleOnSubmit(e) {
        e.preventDefault()
        this.setState({
            is_form_submitting: true
        })
        this.loadAnalyses()

    }

    async handleOnClickStockDate(e) {
        let todayDate = new Date()
        let endingDate = todayDate.getFullYear() + '-' + ("0" + (todayDate.getMonth() + 1)).slice(-2) + '-' + ("0" + todayDate.getDate()).slice(-2)

        await todayDate.setDate(todayDate.getDate() - e.currentTarget.dataset.range)
        let beginningDate = todayDate.getFullYear() + '-' + ("0" + (todayDate.getMonth() + 1)).slice(-2) + '-' + ("0" + todayDate.getDate()).slice(-2)


        let filters = this.state.filters
        filters["beginning_date"] = beginningDate
        filters["ending_date"] = endingDate

        this.setState({
            filters
        })

    }

    render() {

        // render product analyses
        let productAnalysesJsx = ''
        if (this.state.is_product_analyses_loaded) {
            productAnalysesJsx = this.state.product_analyses.map((item) => {
                return (
                    <tr>
                        <td>{item._id.product.product_name}</td>
                        <td>{item.count}</td>
                        <td>{parseFloat(item.total).toFixed(2)} ₺</td>
                    </tr>
                )
            })
        } else {
            if (this.state.is_form_submitting) {

                productAnalysesJsx = (
                    <tr>
                        <td colSpan="3">
                            <LoaderSpin />
                        </td>
                    </tr>
                )
            } else {
                productAnalysesJsx = (
                    <tr>
                        <td colSpan="3">
                            <h5 className="text-center my-5 text-muted">Lütfen tarih aralığı seçiniz</h5>
                        </td>
                    </tr>
                )
            }
        }



        // render offices 
        let officesJsx = ''
        if (this.state.is_offices_loaded) {
            officesJsx = this.state.offices.map((item) => {
                return (
                    <option value={item._id}>{item.office_name}</option>
                )
            })
        }

        return (
            <div class="table-responsive">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div class="btn-group">
                            <button type="button" data-range="30" onClick={this.handleOnClickStockDate} class="btn btn-primary">Son 30 Gün</button>
                            <button type="button" data-range="60" onClick={this.handleOnClickStockDate} class="btn btn-primary">Son 60 Gün</button>
                            <button type="button" data-range="90" onClick={this.handleOnClickStockDate} class="btn btn-primary">Son 90 Gün</button>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <form method="POST" className="form-inline d-flex justify-content-around my-4" onSubmit={this.handleOnSubmit}>
                            <div className="form-row">
                                <div class="form-group">
                                    <label>Şube</label>
                                    <select className="form-control" required name="order_office._id" value={this.state.filters["order_office._id"]} onChange={this.handleOnChange}>
                                        <option value="" selected disabled>Hiçbiri</option>
                                        {officesJsx}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Başlangıç Tarihi</label>
                                    <input className="form-control" required name="beginning_date" value={this.state.filters["beginning_date"]} onChange={this.handleOnChange} type="date" />
                                </div>
                                <div className="form-group ml-3">
                                    <label>Bitiş Tarihi</label>
                                    <input className="form-control" required name="ending_date" value={this.state.filters["ending_date"]} onChange={this.handleOnChange} type="date" />
                                </div>
                                <div className="form-group ml-3">
                                    <button type="submit" className="btn btn-primary"><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Ürün</th>
                            <th>Adet</th>
                            <th>Sipariş Toplamı</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productAnalysesJsx}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TableAnalyseProduct