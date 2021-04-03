import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import TableCategory from '../../../components/Table/Category/TableCategory'
import { urls } from '../../../lib/urls'

class CategoryListView extends Component {
    render() {
        return (
            <>
                <Header onClickToggleMobileMenu={this.handleOnClickToggleMobileMenu} />
                <Sidebar />
                <div className="page-wrapper" style={{ minHeight: '754px' }}>
                    <div className="content container-fluid">
                        <Breadcrumb routeMatch={this.props} />

                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header">
                                    <div className="row">
                                        <div class="col">
                                            <h5 class="card-title">Kategoriler</h5>
                                        </div>
                                        <div class="col-auto">
                                            <Link to={urls.NEW_CATEGORY_VIEW} class="btn-right btn btn-sm btn-outline-primary">
                                                <i className="fas fa-plus"></i> Yeni Kategori Ekle
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                                <div class="card-body">
                                    <TableCategory />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default CategoryListView