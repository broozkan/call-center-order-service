import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getCustomers } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import LoaderSpin from '../../Loader/LoaderSpin'
import Pagination from '../../Pagination/Pagination'


class TableAnalyseEmployee extends Component {
    constructor() {
        super()

        this.state = {
            employee_analyses: [],
            filters: {},
            is_employee_analyses_loaded: false,
            is_form_submitting: false
        }

        this.loadAnalyses = this.loadAnalyses.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnClickStockDate = this.handleOnClickStockDate.bind(this)
    }


    loadAnalyses = async () => {

        const filters = this.state.filters
        filters["employee_analyses"] = "1"

        const analyses = await api.get('/analyse', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: filters })

        this.setState({
            employee_analyses: analyses.data.docs,
            is_form_submitting: true,
            is_employee_analyses_loaded: true
        })
    }

    handleOnChange(e) {
        let filters = this.state.filters
        filters[e.target.name] = e.target.value
        this.setState({
            filters
        })
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

        // render employee analyses
        let employeeAnalysesJsx = ''
        if (this.state.is_employee_analyses_loaded) {
            employeeAnalysesJsx = this.state.employee_analyses.map((item) => {
                return (
                    <tr>
                        <td>{item._id.user.user_name}</td>
                        <td>{parseFloat(item.total).toFixed(2)} ₺</td>
                    </tr>
                )
            })
        } else {
            if (this.state.is_form_submitting) {

                employeeAnalysesJsx = (
                    <tr>
                        <td colSpan="2">
                            <LoaderSpin />
                        </td>
                    </tr>
                )
            } else {
                employeeAnalysesJsx = (
                    <tr>
                        <td colSpan="2">
                            <h5 className="text-center my-5 text-muted">Lütfen tarih aralığı seçiniz</h5>
                        </td>
                    </tr>
                )
            }
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
                                <div className="form-group">
                                    <label>Başlangıç Tarihi</label>
                                    <input className="form-control" name="beginning_date" value={this.state.filters["beginning_date"]} onChange={this.handleOnChange} type="date" />
                                </div>
                                <div className="form-group ml-3">
                                    <label>Bitiş Tarihi</label>
                                    <input className="form-control" name="ending_date" value={this.state.filters["ending_date"]} onChange={this.handleOnChange} type="date" />
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
                            <th>Çalışan</th>
                            <th>Sipariş Toplamı</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeAnalysesJsx}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TableAnalyseEmployee