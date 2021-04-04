import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ContextAuth } from '../../contexts/ContextAuth'
import { urls } from '../../lib/urls'
import FormSearchCustomer from '../Form/Customer/FormSearchCustomer'


class Header extends Component {

    static contextType = ContextAuth


    handleOnClick() {
        localStorage.removeItem('user')
        localStorage.removeItem('auth-token')
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'))
        // render search customer form
        let searchCustomerFormJsx = ''
        if (user.user_type == "call_center_user") {
            searchCustomerFormJsx = (
                <div class="top-nav-search">
                    <FormSearchCustomer />
                </div>
            )
        }

        // render bars
        let barsJsx = ''
        if (user.user_type != "office_user") {
            barsJsx = (
                <>
                    <a href="#" id="toggle_btn" >
                        <i className="fas fa-bars"></i>
                    </a>
                    <a className="mobile_btn" id="mobile_btn" onClick={this.props.onClickToggleMobileMenu}>
                        <i className="fas fa-bars"></i>
                    </a>
                </>
            )
        }

        return (
            <div className="header  no-print">
                <div className="header-left">
                    {/* <a href="index.html" className="logo">
                        <img src="/assets/img/logo.png" alt="Logo" />
                    </a>
                    <a href="index.html" className="logo logo-small">
                        <img src="/assets/img/logo-small.png" alt="Logo" width="30" height="30" />
                    </a> */}
                </div>

                {barsJsx}
                {searchCustomerFormJsx}
                <ul className="nav user-menu">
                    <li className="nav-item dropdown has-arrow main-drop">
                        <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                            <span>{this.context.user.user_name}</span>
                        </a>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to={urls.LOGIN_VIEW} onClick={this.handleOnClick}>Çıkış Yap</Link>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header