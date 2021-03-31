import React, { Component } from 'react'
import { Redirect } from 'react-router'
import FormLogin from '../../components/Form/User/FormLogin'
import { urls } from '../../lib/urls'
import logo from '../../images/call_center_logo.jpeg'

class LoginView extends Component {

    constructor() {
        super()
        this.state = {
            redirect_component: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('auth-token')) {
            this.setState({
                redirect_component: <Redirect to={urls.DASHBOARD_VIEW} />
            })
        }
    }

    render() {
        return (
            <div className="main-wrapper login-body">
                {this.state.redirect_component}
                <div class="login-wrapper">
                    <div class="container">

                        <img class="img-fluid logo-dark mb-2" width="180" src={logo} alt="Logo" />
                        <div class="loginbox">

                            <div class="login-right">
                                <div class="login-right-wrap">
                                    <h1>Giriş Yapın</h1>
                                    <p class="account-subtitle">Has Döner Call Center Sipariş Uygulaması</p>
                                    <FormLogin />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default LoginView