import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormPaymentMethod from '../../../components/Form/PaymentMethod/FormPaymentMethod'
import { urls } from '../../../lib/urls'

class UpdatePaymentMethodView extends Component {
    render() {
        return (
            <>
                <Breadcrumb routeMatch={this.props} />

                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    Ödeme Tipini Düzenle
                                <Link to={urls.PAYMENT_METHOD_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                </h5>
                            </div>
                            <div class="card-body">
                                <FormPaymentMethod payment_method_id={this.props.match.params.paymentMethodId} />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default UpdatePaymentMethodView