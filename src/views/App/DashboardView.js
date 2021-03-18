import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import FormOffice from '../../components/Form/Office/FormOffice'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { urls } from '../../lib/urls'
import OfficeListView from './Office/OfficeListView'
import PreviousOrdersView from './Order/PreviousOrdersView'


class DashboardView extends Component {
    render() {
        return (
            <div className="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">Sipariş Formu</h5>
                        </div>
                        <div class="card-body">
                            <form action="#">
                                <div class="form-group">
                                    <label>Müşteri Telefon Numarası</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="text-right">
                                    <button type="submit" class="btn btn-primary">Bul <i className="fas fa-search"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card bg-white">
                        <div class="card-header">
                            <h5 class="card-title">İşlemler</h5>
                        </div>
                        <Router>
                            <div class="card-body">
                                <ul class="nav nav-tabs nav-tabs-bottom">
                                    <li class="nav-item">
                                        <Link class="nav-link active" to={urls.DASHBOARD_VIEW}>
                                            <i className="fas fa-user"></i> Müşteri Ekle
                                                    </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to={urls.NEW_OFFICE_VIEW}>
                                            <i className="fas fa-user"></i> Şube Ekle
                                                    </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to={urls.DASHBOARD_VIEW}>
                                            <i className="fas fa-cubes"></i> Ürün Ekle
                                                    </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to={urls.PREVIOUS_ORDERS_VIEW}>
                                            <i className="fas fa-history"></i> Geçmiş Siparişler
                                                    </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to={urls.PREVIOUS_ORDERS_VIEW}>
                                            <i className="fas fa-comments"></i> Direkt Mesaj
                                                    </Link>
                                    </li>
                                </ul>

                                <div class="tab-content">
                                    <div class="tab-pane show active" id="bottom-tab1">
                                        <Switch>
                                            <Route path={urls.NEW_OFFICE_VIEW} exact component={FormOffice} ></Route>
                                            <Route path={urls.PREVIOUS_ORDERS_VIEW} exact component={PreviousOrdersView}></Route>
                                        </Switch>
                                    </div>

                                </div>
                            </div>
                        </Router>

                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardView