import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Swal from 'sweetalert2'
import api from '../../../services/api'

class FormLogin extends Component {

    constructor() {
        super()

        this.state = {
            user_email_address: '',
            user_password: '',
            user_remember_me: true,
            redirect_component: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)

    }




    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }


    handleOnSubmit = async (e) => {
        e.preventDefault()

        const submitResponse = await api.post('/users/login', {}, { auth: { username: this.state.user_email_address, password: this.state.user_password } })


        if (submitResponse.data.status != 400) {
            Swal.fire({
                title: "İşlem başarılı!",
                icon: "success"
            })

            localStorage.setItem('auth-token', submitResponse.data.token)
            localStorage.setItem('user', JSON.stringify(submitResponse.data.responseData[0]))
            if (submitResponse.data.responseData[0].user_type == "call_center_user") {
                this.setState({
                    redirect_component: <Redirect to="/app/musteriler/detay" />
                })
            } else if (submitResponse.data.responseData[0].user_type == "office_user") {
                this.setState({
                    redirect_component: <Redirect to="/canli-siparis-ekrani" />
                })
            } else {
                this.setState({
                    redirect_component: <Redirect to="/app" />
                })
            }

        } else {
            Swal.fire({
                title: "Hata",
                text: submitResponse.data.responseData,
                icon: "error"
            })
        }


    }


    render() {
        return (

            <form onSubmit={this.handleOnSubmit}>
                {this.state.redirect_component}
                <div class="form-group">
                    <label class="form-control-label">E-Posta Adresi</label>
                    <input type="email" name="user_email_address" value={this.state.user_email_address} onChange={this.handleOnChange} class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-control-label">Parola</label>
                    <input type="password" name="user_password" value={this.state.user_password} onChange={this.handleOnChange} class="form-control pass-input" />
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-6">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" name="user_remember_me" checked={this.state.user_remember_me} class="custom-control-input" id="cb1" />
                                <label class="custom-control-label" for="cb1">Beni hatırla</label>
                            </div>
                        </div>
                        <div class="col-6 text-right">
                            <a class="forgot-link" href="forgot-password.html">Parolanızı mı unuttunuz ?</a>
                        </div>
                    </div>
                </div>
                <button class="btn btn-lg btn-block btn-primary" type="submit">Giriş Yap</button>

            </form>
        )
    }
}

export default FormLogin