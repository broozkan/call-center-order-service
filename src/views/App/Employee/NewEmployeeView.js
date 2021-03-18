import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormEmployee from '../../../components/Form/Employee/FormEmployee'
import { urls } from '../../../lib/urls'

class NewEmployeeView extends Component {


    render() {


        return (
            <>
                <Breadcrumb routeMatch={this.props} />
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">
                                    Yeni Çalışan Ekle
                                <Link to={urls.EMPLOYEE_LIST_VIEW} className="btn btn-outline-primary btn-sm float-right"><i className="fas fa-times"></i> İptal</Link>
                                </h5>
                            </div>
                            <div class="card-body">
                                <FormEmployee />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default NewEmployeeView