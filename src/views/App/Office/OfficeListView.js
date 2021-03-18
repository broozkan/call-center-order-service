import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import TableOffice from '../../../components/Table/Office/TableOffice'
import { urls } from '../../../lib/urls'

class OfficeListView extends Component {
    render() {
        return (
            <>
                <Breadcrumb routeMatch={this.props} />

                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <div className="row">
                                <div class="col">
                                    <h5 class="card-title">Şubeler</h5>
                                </div>
                                <div class="col-auto">
                                    <Link to={urls.NEW_OFFICE_VIEW} class="btn-right btn btn-sm btn-outline-primary">
                                        <i className="fas fa-plus"></i> Yeni Şube Ekle
								    </Link>
                                </div>
                            </div>

                        </div>
                        <div class="card-body">
                            <TableOffice />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default OfficeListView