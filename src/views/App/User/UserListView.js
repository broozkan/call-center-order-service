import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import TableUser from '../../../components/Table/User/TableUser'
import { urls } from '../../../lib/urls'

class UserListView extends Component {
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
                                            <h5 class="card-title">Kullanıcılar</h5>
                                        </div>
                                        <div class="col-auto">
                                            <Link to={urls.NEW_USER_VIEW} class="btn-right btn btn-sm btn-outline-primary">
                                                <i className="fas fa-plus"></i> Yeni Kullanıcı Ekle
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                                <div class="card-body">
                                    <TableUser />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default UserListView