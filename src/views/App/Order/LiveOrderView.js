import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
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
        console.log(this.state);

        return (

            <div className="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <div className="row">
                                <div class="col">
                                    <h5 class="card-title">Kayseri Şube Sipariş Yönetim</h5>
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


        )
    }
}

export default LiveOrderView