import React, { Component } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'

class FormEmployee extends Component {

    constructor() {
        super()

        this.state = {
            employee_name: '',
            employee_province: '',
            employee_email_address: '',
            employee_phone_number: '',
            employee_address: '',
            employee_id_number: '',
            employee_password: '',
            employee_password_repeat: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getEmployee = this.getEmployee.bind(this)

    }

    componentDidMount() {
        if (this.props.employee_id) {
            this.getEmployee()
        }
    }

    getEmployee = async () => {
        const employee = await api.get('/employees/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.props.employee_id } })
        this.setState(employee.data.docs[0])

    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleOnSubmit = async (e) => {
        e.preventDefault()

        let submitResponse = ''
        if (this.props.employee_id) {
            submitResponse = await api.put(`/employees/${this.props.employee_id}`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/employees`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
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
        return (
            <form method="POST" onSubmit={this.handleOnSubmit}>
                <div class="form-group">
                    <label>Adı</label>
                    <input type="text" class="form-control" name="employee_name" value={this.state.employee_name} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Şehir</label>
                    <select className="form-control" name="employee_province" value={this.state.employee_province} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Şehir Seçiniz</option>
                        <option value="Sivas">Sivas</option>
                        <option value="Kayseri">Kayseri</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>E-posta Adresi</label>
                    <input type="email" class="form-control" name="employee_email_address" value={this.state.employee_email_address} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Telefon Numarası</label>
                    <input type="number" class="form-control" name="employee_phone_number" value={this.state.employee_phone_number} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Adres</label>
                    <input type="text" class="form-control" name="employee_address" value={this.state.employee_address} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>TC Kimlik Numarası</label>
                    <input type="number" class="form-control" name="employee_id_number" value={this.state.employee_id_number} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Parola</label>
                    <input type="password" class="form-control" name="employee_password" value={this.state.employee_password} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Parola (Tekrar)</label>
                    <input type="password" class="form-control" name="employee_password_repeat" value={this.state.employee_password_repeat} onChange={this.handleOnChange} />
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                </div>
            </form>
        )
    }
}

export default FormEmployee