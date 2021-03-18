import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormReservation from '../../../components/Form/Reservation/FormReservation'
import { urls } from '../../../lib/urls'

class UpdateReservationView extends Component {
    render() {
        return (
            <>
                <Breadcrumb routeMatch={this.props} />

                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    Rezervasyonı Düzenle
                                    <Link to={urls.RESERVATION_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                </h5>
                            </div>
                            <div class="card-body">
                                <FormReservation reservation_id={this.props.match.params.reservationId} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default UpdateReservationView