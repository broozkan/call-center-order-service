import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import TableAnalyseEmployee from '../../components/Table/Analyse/TableAnalyseEmployee'
import TableAnalyseOffice from '../../components/Table/Analyse/TableAnalyseOffice'
import TableAnalyseProduct from '../../components/Table/Analyse/TableAnalyseProduct'
import api from '../../services/api'


class DashboardView extends Component {

    render() {
        return (
            <>
                <Header onClickToggleMobileMenu={this.handleOnClickToggleMobileMenu} />
                <Sidebar />
                <div className="page-wrapper" style={{ minHeight: '754px' }}>
                    <div className="content container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div class="card">
                                    <div class="card-header">
                                        <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
                                            <li class="nav-item"><a class="nav-link active" href="#bottom-justified-tab1" data-toggle="tab">Şubelere Göre Veriler</a></li>
                                            <li class="nav-item"><a class="nav-link" href="#bottom-justified-tab2" data-toggle="tab">Çalışanlara Göre Veriler</a></li>
                                            <li class="nav-item"><a class="nav-link" href="#bottom-justified-tab3" data-toggle="tab">Ürünlere Göre Veriler</a></li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content mt-0">
                                            <div class="tab-pane show active" id="bottom-justified-tab1">
                                                <TableAnalyseOffice />
                                            </div>
                                            <div class="tab-pane" id="bottom-justified-tab2">
                                                <TableAnalyseEmployee />
                                            </div>
                                            <div class="tab-pane" id="bottom-justified-tab3">
                                                <TableAnalyseProduct />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default DashboardView