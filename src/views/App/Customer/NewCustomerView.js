import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormCustomer from '../../../components/Form/Customer/FormCustomer'
import { urls } from '../../../lib/urls'

class NewCustomerView extends Component {


    render() {


        return (
            <>
                <Breadcrumb routeMatch={this.props} />
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    Yeni Müşteri Ekle
                                <Link to={urls.CUSTOMER_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                </h5>
                            </div>
                            <div class="card-body">
                                <FormCustomer />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default NewCustomerView