import React, { Component } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'
import provinces from '../../../lib/provinces'

class FormOffice extends Component {

    constructor() {
        super()

        this.state = {
            office_name: '',
            office_province: '',
            office_address: '',
            office_order_priority_number: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getOffice = this.getOffice.bind(this)

    }

    componentDidMount() {
        if (this.props.office_id) {
            this.getOffice()
        }
    }

    getOffice = async () => {
        const office = await api.get('/offices/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.props.office_id } })

        this.setState(office.data.docs[0])

    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleOnSubmit = async (e) => {
        e.preventDefault()

        let submitResponse = ''
        if (this.props.office_id) {
            submitResponse = await api.put(`/offices/${this.props.office_id}`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/offices`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
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

        // render provinces
        let provincesJsx = provinces.map((item) => {
            return (
                <option value={item}>{item}</option>
            )
        })

        return (
            <form method="POST" onSubmit={this.handleOnSubmit}>
                <div class="form-group">
                    <label>Adı</label>
                    <input type="text" class="form-control" name="office_name" value={this.state.office_name} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Şehir</label>
                    <select className="form-control" name="office_province" value={this.state.office_province} onChange={this.handleOnChange}>
                        <option value="" selected disabled>Şehir Seçiniz</option>
                        {provincesJsx}
                    </select>
                </div>
                <div class="form-group">
                    <label>Adresi</label>
                    <input type="text" class="form-control" name="office_address" value={this.state.office_address} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Sıralama Önceliği</label>
                    <input type="number" class="form-control" name="office_order_priority_number" value={this.state.office_order_priority_number} onChange={this.handleOnChange} />
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                </div>
            </form>
        )
    }
}

export default FormOffice