import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormCategory from '../../../components/Form/Category/FormCategory'
import { urls } from '../../../lib/urls'

class UpdateCategoryView extends Component {
    render() {
        return (
            <>
                <Breadcrumb routeMatch={this.props} />

                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    Kategoriyi Düzenle
                                <Link to={urls.CATEGORY_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                </h5>
                            </div>
                            <div class="card-body">
                                <FormCategory category_id={this.props.match.params.categoryId} />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default UpdateCategoryView