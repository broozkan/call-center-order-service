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
                            <li>
                                <a href="customers.html"><i data-feather="users"></i> <span>Customers</span></a>
                            </li>
                            <li>
                                <a href="estimates.html"><i data-feather="file-text"></i> <span>Estimates</span></a>
                            </li>
                            <li>
                                <a href="invoices.html"><i data-feather="clipboard"></i> <span>Invoices</span></a>
                            </li>
                            <li>
                                <a href="payments.html"><i data-feather="credit-card"></i> <span>Payments</span></a>
                            </li>
                            <li>
                                <a href="expenses.html"><i data-feather="package"></i> <span>Expenses</span></a>
                            </li>
                            <li>
                                <a href="settings.html"><i data-feather="settings"></i> <span>Settings</span></a>
                            </li>
                            <li className="submenu">
                                <a href="#"><i data-feather="grid"></i> <span> Application</span> <span className="menu-arrow"></span></a>
                                <ul>
                                    <li><a href="chat.html">Chat</a></li>
                                    <li><a href="calendar.html">Calendar</a></li>
                                    <li><a href="inbox.html">Email</a></li>
                                </ul>
                            </li>
                            <li className="menu-title">
                                <span>Pages</span>
                            </li>
                            <li>
                                <a href="profile.html"><i data-feather="user-plus"></i> <span>Profile</span></a>
                            </li>
                            <li className="submenu">
                                <a href="#"><i data-feather="lock"></i> <span> Authentication </span> <span className="menu-arrow"></span></a>
                                <ul>
                                    <li><a href="login.html"> Login </a></li>
                                    <li><a href="register.html"> Register </a></li>
                                    <li><a href="forgot-password.html"> Forgot Password </a></li>
                                    <li><a href="lock-screen.html"> Lock Screen </a></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <a href="#"><i data-feather="alert-octagon"></i> <span> Error Pages </span> <span className="menu-arrow"></span></a>
                                <ul>
                                    <li><a href="error-404.html">404 Error </a></li>
                                    <li><a href="error-500.html">500 Error </a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="users.html"><i data-feather="user"></i> <span>Users</span></a>
                            </li>
                            <li>
                                <a href="blank-page.html"><i data-feather="file"></i> <span>Blank Page</span></a>
                            </li>
                            <li>
                                <a href="maps-vector.html"><i data-feather="map-pin"></i> <span>Vector Maps</span></a>
                            </li>
                            <li className="menu-title">
                                <span>UI Interface</span>
                            </li>
                            <li>
                                <a href="components.html"><i data-feather="layers"></i> <span>Components</span></a>
                            </li>
                            <li className="submenu">
                                <a href="#"><i data-feather="columns"></i> <span> Forms </span> <span className="menu-arrow"></span></a>
                                <ul>
                                    <li><a href="form-basic-inputs.html">Basic Inputs </a></li>
                                    <li><a href="form-input-groups.html">Input Groups </a></li>
                                    <li><a href="form-horizontal.html">Horizontal Form </a></li>
                                    <li><a href="form-vertical.html"> Vertical Form </a></li>
                                    <li><a href="form-mask.html"> Form Mask </a></li>
                                    <li><a href="form-validation.html"> Form Validation </a></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <a href="#"><i data-feather="layout"></i> <span> Tables </span> <span className="menu-arrow"></span></a>
                                <ul>
                                    <li><a href="tables-basic.html">Basic Tables </a></li>
                                    <li><a href="data-tables.html">Data Table </a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar