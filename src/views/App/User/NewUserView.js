import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormUser from '../../../components/Form/User/FormUser'
import { urls } from '../../../lib/urls'
import Header from '../../../components/Header/Header'
import Sidebar from '../../../components/Sidebar/Sidebar'
class NewUserView extends Component {


    render() {


        return (
            <>
                <Header onClickToggleMobileMenu={this.handleOnClickToggleMobileMenu} />
                <Sidebar />
                <div className="page-wrapper" style={{ minHeight: '754px' }}>
                    <div className="content container-fluid">

                        <Breadcrumb routeMatch={this.props} />
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title">
                                            Yeni Kullanıcı Ekle
                                <Link to={urls.USER_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <FormUser />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default NewUserView