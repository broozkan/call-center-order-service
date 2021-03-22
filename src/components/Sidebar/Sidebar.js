import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { urls } from '../../lib/urls'


class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className="menu-title"><span>Main</span></li>
                            <li className="active">
                                <Link to={urls.DASHBOARD_VIEW}><i className="fas fa-home"></i> <span>Panel</span></Link>
                            </li>
                            <li>
                                <Link to={urls.EMPLOYEE_LIST_VIEW}><i className="fas fa-users"></i> <span>Çalışanlar</span></Link>
                            </li>
                            <li>
                                <Link to={urls.OFFICE_LIST_VIEW}><i className="fas fa-map-pin"></i> <span>Şubeler</span></Link>
                            </li>
                            <li>
                                <Link to={urls.PRODUCT_LIST_VIEW}><i className="fas fa-cubes"></i> <span>Ürünler</span></Link>
                            </li>
                            <li>
                                <Link to={urls.CUSTOMER_LIST_VIEW}><i className="fas fa-users"></i> <span>Müşteriler</span></Link>
                            </li>
                            <li>
                                <Link to={urls.ORDER_LIST_VIEW}><i className="fas fa-database"></i> <span>Siparişler</span></Link>
                            </li>
                            <li>
                                <Link to={urls.RESERVATION_LIST_VIEW}><i className="fas fa-edit"></i> <span>Rezervasyonlar</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar