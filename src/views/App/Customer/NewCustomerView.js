import React, { Component } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormCustomer from '../../../components/Form/Customer/FormCustomer'
import { urls } from '../../../lib/urls'
class NewCustomerView extends Component {

    constructor() {
        super()

        this.state = {
            customer_phone_number: '',
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.match.params.customerPhoneNumber != nextProps.match.params.customerPhoneNumber) {
            await this.setState({
                customer_phone_number: nextProps.match.params.customerPhoneNumber
            })
        }
    }

    async componentDidMount() {
        await this.setState({
            customer_phone_number: this.props.match.params.customerPhoneNumber
        })
    }

    render() {
        let formCustomerJsx = ''
        if (this.state.customer_phone_number != '') {
            formCustomerJsx = (
                <FormCustomer state={{ customer_phone_number: this.state.customer_phone_number }} />
            )
        } else {
            <FormCustomer />
        }

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
                                {formCustomerJsx}
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default NewCustomerView