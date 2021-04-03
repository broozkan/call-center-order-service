import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormReservation from '../../../components/Form/Reservation/FormReservation'
import Header from '../../../components/Header/Header'
import Sidebar from '../../../components/Sidebar/Sidebar'
import { urls } from '../../../lib/urls'

class NewReservationView extends Component {


    render() {


        return (
            <>
                <Header onClickToggleMobileMenu={this.handleOnClickToggleMobileMenu} />
                <Sidebar />
                <div className="page-wrapper" style={{ minHeight: '754px' }}>
                    <div className="content container-fluid">
                        <Breadcrumb routeMatch={this.props} />
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title">
                                            Yeni Rezervasyon Ekle
                                <Link to={urls.RESERVATION_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <FormReservation />
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

export default NewReservationView