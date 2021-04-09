import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { urls } from '../../lib/urls'


class Sidebar extends Component {
    render() {
        const user = JSON.parse(localStorage.getItem('user'))


        let linksJsx = ''
        if (user.user_type == "call_center_user" || user.user_type == "office_user") {
            linksJsx = (
                <>
                    <li>
                        <Link to={urls.CUSTOMER_LIST_VIEW}><i className="fas fa-users"></i> <span>Müşteriler</span></Link>
                    </li>
                    <li>
                        <Link to={urls.ORDER_LIST_VIEW}><i className="fas fa-database"></i> <span>Siparişler</span></Link>
                    </li>
                    <li>
                        <Link to={urls.RESERVATION_LIST_VIEW}><i className="fas fa-edit"></i> <span>Rezervasyonlar</span></Link>
                    </li>
                </>
            )
        } else {
            linksJsx = (
                <>
                <li className="menu-title"><span>Main</span></li>
                <li className="active">
                    <Link to={urls.DASHBOARD_VIEW}><i className="fas fa-home"></i> <span>Panel</span></Link>
                </li>
                <li>
                    <Link to={urls.USER_LIST_VIEW}><i className="fas fa-users"></i> <span>Kullanıcılar</span></Link>
                </li>
                <li>
                    <Link to={urls.OFFICE_LIST_VIEW}><i className="fas fa-map-pin"></i> <span>Şubeler</span></Link>
                </li>
                <li>
                    <Link to={urls.CATEGORY_LIST_VIEW}><i className="fas fa-database"></i> <span>Kategoriler</span></Link>
                </li>
                <li>
                    <Link to={urls.PRODUCT_LIST_VIEW}><i className="fas fa-cubes"></i> <span>Ürünler</span></Link>
                </li>
                <li>
                    <Link to={urls.CUSTOMER_LIST_VIEW}><i className="fas fa-users"></i> <span>Müşteriler</span></Link>
                </li>
                <li>
                    <Link to={urls.PAYMENT_METHOD_LIST_VIEW}><i className="fas fa-money-bill"></i> <span>Ödeme Tipleri</span></Link>
                </li>
                <li>
                    <Link to={urls.ORDER_LIST_VIEW}><i className="fas fa-database"></i> <span>Siparişler</span></Link>
                </li>
                <li>
                    <Link to={urls.RESERVATION_LIST_VIEW}><i className="fas fa-edit"></i> <span>Rezervasyonlar</span></Link>
                </li>
            </>
            )
            
        }


        return (
            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            {linksJsx}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar