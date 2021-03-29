import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import TableProduct from '../../../components/Table/Product/TableProduct'
import { urls } from '../../../lib/urls'

class ProductListView extends Component {
    render() {
        return (
            <>
                <Breadcrumb routeMatch={this.props} />

                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <div className="row">
                                <div class="col">
                                    <h5 class="card-title">Ürünlar</h5>
                                </div>
                                <div class="col-auto">
                                    <Link to={urls.NEW_PRODUCT_VIEW} class="btn-right btn btn-sm btn-outline-primary">
                                        <i className="fas fa-plus"></i> Yeni Ürün Ekle
								    </Link>
                                </div>
                            </div>

                        </div>
                        <div class="card-body">
                            <TableProduct />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProductListView