import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormOrder from '../../../components/Form/Order/FormOrder'
import { urls } from '../../../lib/urls'

class NewOrderView extends Component {


    render() {


        return (
            <>
                <Breadcrumb routeMatch={this.props} />
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    Yeni Sipariş Ekle
                                <Link to={urls.ORDER_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                </h5>
                            </div>
                            <div class="card-body">
                                <FormOrder />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default NewOrderView