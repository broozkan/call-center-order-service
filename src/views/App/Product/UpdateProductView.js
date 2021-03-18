import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormProduct from '../../../components/Form/Product/FormProduct'
import { urls } from '../../../lib/urls'

class UpdateProductView extends Component {
    render() {
        return (
            <>
                <Breadcrumb routeMatch={this.props} />

                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    Ürünı Düzenle
                                    <Link to={urls.PRODUCT_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                </h5>
                            </div>
                            <div class="card-body">
                                <FormProduct product_id={this.props.match.params.productId} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default UpdateProductView