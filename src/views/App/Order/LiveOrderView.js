import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import TabLiveOrder from '../../../components/Tab/TabLiveOrder';
import TableLiveOrder from '../../../components/Table/Order/TableLiveOrder';
import TableOrder from '../../../components/Table/Order/TableOrder'
import { urls } from '../../../lib/urls'

class LiveOrderView extends Component {
    render() {
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
                            <TabLiveOrder  match={this.props.match} />
                            <TableLiveOrder />
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default LiveOrderView