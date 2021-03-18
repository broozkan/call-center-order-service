import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import TableOrder from '../../../components/Table/Order/TableOrder'
import { urls } from '../../../lib/urls'

class OrderListView extends Component {
    render() {
        return (
            <>
                <Breadcrumb routeMatch={this.props} />

                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <div className="row">
                                <div class="col">
                                    <h5 class="card-title">Siparişlar</h5>
                                </div>
                                <div class="col-auto">
                                    <Link to={urls.NEW_ORDER_VIEW} class="btn-right btn btn-sm btn-outline-primary">
                                        <i className="fas fa-plus"></i> Yeni Sipariş Ekle
								    </Link>
                                </div>
                            </div>

                        </div>
                        <div class="card-body">
                            <TableOrder />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default OrderListView