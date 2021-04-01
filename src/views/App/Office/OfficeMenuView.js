import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import TabLiveOrder from '../../../components/Tab/TabLiveOrder';
import TableOffice from '../../../components/Table/Office/TableOffice'
import TableProduct from '../../../components/Table/Product/TableProduct';
import { urls } from '../../../lib/urls'

class OfficeMenuView extends Component {
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
        if (this.props.match.params.availabilityState != nextProps.match.params.availabilityState) {
            this.setState({
                match: nextProps.match
            })
        }
    }


    render() {
        const user = JSON.parse(localStorage.getItem('user'))
        return (
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
                            <TableProduct params={{ 'product_office._id': user.user_office._id }} match={this.state.match} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OfficeMenuView