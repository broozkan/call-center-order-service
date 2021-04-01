import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { getOffices } from '../../../controllers/MainController'
import api from '../../../services/api'

class FormUser extends Component {

    constructor() {
        super()

        this.state = {
            user_name: '',
            user_email_address: '',
            user_password: '',
            user_password_repeat: '',
            user_office: {},
            user_type: '',
            offices: [],
            is_offices_loaded: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getUser = this.getUser.bind(this)

    }

    componentDidMount() {
        if (this.props.user_id) {
            this.getUser()
        }

        getOffices(1, {}, (results) => {
            this.setState({
                offices: results.data.docs,
                is_offices_loaded: true
            })

        })
    }

    getUser = async () => {
        const user = await api.get('/users/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.props.user_id } })
        this.setState(user.data.docs[0])

    }


    handleOnChange = (e) => {
        if (e.target.name === "user_office") {
            let userOffice = {}
            this.state.offices.map((item) => {
                if (e.target.value == item._id) {
                    userOffice = item
                }
            })

            this.setState({
                user_office: userOffice
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

    }


    handleOnSubmit = async (e) => {
        e.preventDefault()

        let submitResponse = ''
        if (this.props.user_id) {
            submitResponse = await api.put(`/users/${this.props.user_id}`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/users`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.status == 200) {
            Swal.fire({
                title: "İşlem başarılı!",
                icon: "success"
            })
        } else {
            Swal.fire({
                title: "Hata",
                text: submitResponse.responseData,
                icon: "error"
            })
        }


    }


    render() {

        // render offices 
        let officesJsx = ''
        if (this.state.is_offices_loaded) {
            officesJsx = this.state.offices.map((item) => {
                return (
                    <option value={item._id}>{item.office_name}</option>
                )
            })
        }

        console.log(this.state);

        return (
            <form method="POST" onSubmit={this.handleOnSubmit}>
                <div class="form-group">
                    <label>Adı *</label>
                    <input type="text" required class="form-control" name="user_name" value={this.state.user_name} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>E-posta Adresi</label>
                    <input type="email" class="form-control" name="user_email_address" value={this.state.user_email_address} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Parola *</label>
                    <input type="password" required class="form-control" name="user_password" value={this.state.user_password} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Parola (Tekrar) *</label>
                    <input type="password" required class="form-control" name="user_password_repeat" value={this.state.user_password_repeat} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Şube *</label>
                    <select required className="form-control" name="user_office" value={this.state.user_office._id} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Hiçbiri</option>
                        {officesJsx}
                    </select>
                </div>


                <div class="form-group">
                    <label>Kullanıcı Tipi *</label>
                    <select required className="form-control" name="user_type" required value={this.state.user_type} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Kullanıcı tipi seçiniz</option>
                        <option value="call_center_user">Call Center Kullanıcısı</option>
                        <option value="office_user">Şube Kullanıcısı</option>
                        <option value="super_user">Admin Kullanıcısı</option>
                    </select>
                </div>



                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                </div>
            </form>
        )
    }
}

export default FormUser