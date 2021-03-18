import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormProduct from '../../../components/Form/Product/FormProduct'
import { urls } from '../../../lib/urls'

class NewProductView extends Component {


    render() {


        return (
            <>
                <Breadcrumb routeMatch={this.props} />
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    Yeni Ürün Ekle
                                <Link to={urls.PRODUCT_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                </h5>
                            </div>
                            <div class="card-body">
                                <FormProduct />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default NewProductView