import React, { Component } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'

class FormCategory extends Component {

    constructor() {
        super()

        this.state = {
            category_name: '',
            category_order_priority_number: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getCategory = this.getCategory.bind(this)

    }

    componentDidMount() {
        if (this.props.category_id) {
            this.getCategory()
        }
    }

    getCategory = async () => {
        const category = await api.get('/categories/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.props.category_id } })

        this.setState(category.data.docs[0])

    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleOnSubmit = async (e) => {
        e.preventDefault()

        let submitResponse = ''
        if (this.props.category_id) {
            submitResponse = await api.put(`/categories/${this.props.category_id}`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/categories`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
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
                    <input type="text" class="form-control" name="category_name" value={this.state.category_name} onChange={this.handleOnChange} />
                </div>
                <div class="form-group">
                    <label>Sıralama Önceliği</label>
                    <input type="number" class="form-control" name="category_order_priority_number" value={this.state.category_order_priority_number} onChange={this.handleOnChange} />
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                </div>
            </form>
        )
    }
}

export default FormCategory