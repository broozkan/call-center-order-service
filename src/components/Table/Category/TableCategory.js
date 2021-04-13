import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteObject, getCategories } from '../../../controllers/MainController'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'
import Pagination from '../../Pagination/Pagination'


class TableCategory extends Component {
    constructor() {
        super()

        this.state = {
            categories: [],
            pagination_info: '',
            current_page: 1,
            is_categories_loaded: false
        }

        this.loadCategories = this.loadCategories.bind(this)
    }

    componentDidMount() {
        getCategories(this.state.current_page, {}, (response) => {
            this.setState({
                categories: response.data.docs,
                pagination_info: response.data,
                is_categories_loaded: true
            })
        })
    }

    loadCategories = (page = this.state.current_page) => {
        getCategories(page, {}, (response) => {
            this.setState({
                categories: response.data.docs,
                pagination_info: response.data,
                is_categories_loaded: true,
                current_page: page
            })
        })
    }


    handleOnClickDelete = (e) => {
        deleteObject(`/categories/${e.currentTarget.dataset.id}`, (response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Silindi",
                    icon: "success"
                })
                this.loadCategories(this.state.current_page)
            } else {
                Swal.fire({
                    title: "Bir sorun oluştu",
                    icon: "error"
                })
            }
        })

    }

    render() {


        // render categories
        let categoriesJsx = ''
        if (this.state.is_categories_loaded) {
            categoriesJsx = this.state.categories.map((item) => {
                return (
                    <tr>
                        <td>{item.category_name}</td>
                        <td>{item.category_order_priority_number}</td>
                        <td>
                            <Link to={`${urls.UPDATE_CATEGORY_VIEW}/${item._id}`} className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Düzenle</Link>
                            <button data-id={item._id} onClick={this.handleOnClickDelete} className="btn btn-outline-primary btn-sm ml-2"><i className="fas fa-trash"></i> Sil</button>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Adı</th>
                            <th>Sıralama Önceliği</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriesJsx}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.loadCategories} />
            </div>
        )
    }
}
export default TableCategory