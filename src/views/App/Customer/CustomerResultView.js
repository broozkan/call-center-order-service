import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import FormCustomer from '../../../components/Form/Customer/FormCustomer'
import FormSearchCustomer from '../../../components/Form/Customer/FormSearchCustomer'
import FormOrder from '../../../components/Form/Order/FormOrder'
import Header from '../../../components/Header/Header'
import LoaderSpin from '../../../components/Loader/LoaderSpin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import TableLiveOrder from '../../../components/Table/Order/TableLiveOrder'
import TableOrder from '../../../components/Table/Order/TableOrder'
import { getCustomers } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'


class CustomerResultView extends Component {

    constructor() {
        super()
        this.state = {
            customer: {},
            customer_id: '',
            is_customer_loaded: false
        }

        this.loadCustomers = this.loadCustomers.bind(this)
    }



    async componentWillReceiveProps(nextProps) {
        if (this.props.match.params.customerId != nextProps.match.params.customerId) {
            await this.setState({
                customer_id: nextProps.match.params.customerId
            })

            this.loadCustomers()
        }
    }


    async componentDidMount() {

        if (this.props.match.params.customerId) {
            await this.setState({
                customer_id: this.props.match.params.customerId
            })

            await this.loadCustomers()
        }
    }

    async loadCustomers() {
        await getCustomers(1, { '_id': this.state.customer_id }, (results) => {
            this.setState({
                customer: results.data.docs[0],
                is_customer_loaded: true
            })
        })
    }

    render() {
        // render content
        if (!this.state.is_customer_loaded) {
            if (!this.state.order_customer) {
                return (
                    <>
                        <Header onClickToggleMobileMenu={this.handleOnClickToggleMobileMenu} />
                        <Sidebar />
                        <div className="page-wrapper" style={{ minHeight: '754px' }}>
                            <div className="content container-fluid text-center">
                                <h6 className="text-muted" style={{ marginTop: '40vh' }}>
                                    <i className="fas fa-dog fa-3x"></i>
                                    <br></br>
                                    <br></br>
                                    Telefon numarası girmenizi bekliyoruz
                                </h6>
                            </div>
                        </div>
                    </>

                )
            }
            return (
                <LoaderSpin />
            )
        } else {

            let customerNoteJsx = ''
            if (this.state.customer.customer_note != '') {
                customerNoteJsx = (
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Not!</strong> {this.state.customer.customer_note}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                )
            }

            return (
                <>
                    <Header onClickToggleMobileMenu={this.handleOnClickToggleMobileMenu} />
                    <Sidebar />
                    <div className="page-wrapper" style={{ minHeight: '754px' }}>
                        <div className="content container-fluid">
                            <div class="row">
                                <div class="col-md-12">

                                    <div class="text-center mb-5">

                                        <h2>{this.state.customer.customer_name}</h2>
                                        <ul class="list-block">

                                            <li class="list-block-item">
                                                <i class="fas fa-phone mr-2"></i>
                                                {this.state.customer.customer_phone_number}
                                            </li>
                                        </ul>
                                    </div>
                                    {customerNoteJsx}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
                                                <li class="nav-item"><a class="nav-link active" onClick={this.loadCustomers} href="#bottom-justified-tab1" data-toggle="tab">Sipariş Gir</a></li>
                                                <li class="nav-item"><a class="nav-link" href="#bottom-justified-tab2" data-toggle="tab">Geçmiş Siparişleri</a></li>
                                                <li class="nav-item"><a class="nav-link" href="#bottom-justified-tab3" data-toggle="tab">Bilgilerini Düzenle</a></li>
                                            </ul>
                                        </div>
                                        <div class="card-body">
                                            <div class="tab-content">
                                                <div class="tab-pane show active" id="bottom-justified-tab1">
                                                    <FormOrder state={{ order_customer: this.state.customer }} />
                                                </div>
                                                <div class="tab-pane" id="bottom-justified-tab2">
                                                    <TableLiveOrder params={{ 'order_customer._id': this.state.customer_id }} />
                                                </div>
                                                <div class="tab-pane" id="bottom-justified-tab3">
                                                    <FormCustomer customer_id={this.state.customer_id} />
                                                </div>
                                            </div>
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
}

export default CustomerResultView