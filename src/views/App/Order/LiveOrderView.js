import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Header from '../../../components/Header/Header';
import TabLiveOrder from '../../../components/Tab/TabLiveOrder';
import TableLiveOrder from '../../../components/Table/Order/TableLiveOrder';
import TableOrder from '../../../components/Table/Order/TableOrder'
import { urls } from '../../../lib/urls'

class LiveOrderView extends Component {


    constructor() {
        super()
        this.state = {
            match: ''
        }
    }

    componentDidMount() {
        this.setState({
            match: this.props.match
        })
    }
    async componentWillReceiveProps(nextProps) {
        if (this.props.match.params.orderState != nextProps.match.params.orderState) {
            this.setState({
                match: nextProps.match
            })
        }
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'))

        return (
            <>
                <Header onClickToggleMobileMenu={this.handleOnClickToggleMobileMenu} />
                <div className="page-wrapper" style={{ minHeight: '754px', marginLeft: '0px' }}>
                    <div className="content container-fluid">
                        <div className="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header">
                                        <div className="row">
                                            <div class="col">
                                                <h5 class="card-title">{user.user_office.office_name} Sipariş Yönetim</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <TabLiveOrder match={this.state.match} />
                                        <TableLiveOrder match={this.state.match} />
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

export default LiveOrderView