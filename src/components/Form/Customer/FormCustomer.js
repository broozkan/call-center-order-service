import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Swal from 'sweetalert2'
import { urls } from '../../../lib/urls'
import api from '../../../services/api'

class FormCustomer extends Component {

    constructor() {
        super()

        this.state = {
            customer_id: '',
            customer_name: '',
            customer_email_address: '',
            customer_phone_number: '',
            customer_address: [{
                address: '',
                address_description: '',
                address_minimum_amount: 0,
                address_province: ''
            }],
            customer_note: '',
            redirect_jsx: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.getCustomer = this.getCustomer.bind(this)
        this.handleOnClickNewAddress = this.handleOnClickNewAddress.bind(this)
        this.handleOnClickDeleteAddress = this.handleOnClickDeleteAddress.bind(this)

    }


    async componentWillReceiveProps(nextProps) {
        if (this.props.customer_id != nextProps.customer_id) {
            await this.setState({
                customer_id: nextProps.customer_id
            })

            this.getCustomer()
        }
    }

    async componentDidMount() {
        if (this.props.customer_id) {
            await this.setState({
                customer_id: this.props.customer_id
            })
            this.getCustomer()
        }


        if (this.props.state) {
            this.setState(this.props.state)
        }
    }

    getCustomer = async () => {

        const customer = await api.get('/customers/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { "_id": this.state.customer_id } })
        this.setState(customer.data.docs[0])

    }

    handleOnClickNewAddress(e) {
        let customerAddresses = this.state.customer_address

        customerAddresses.push({
            address: '',
            address_description: '',
            address_minimum_amount: 0,
            address_province: ''
        })

        this.setState({
            customer_address: customerAddresses
        })
    }

    handleOnClickDeleteAddress(e) {

        let customerAddresses = new Array()

        this.state.customer_address.map((item, index) => {
            if (index == e.currentTarget.dataset.index) {

            } else {
                customerAddresses.push(item)
            }
        })

        this.setState({
            customer_address: customerAddresses
        })

    }

    handleOnChange = (e) => {
        if (e.target.name == "address" || e.target.name == "address_description" || e.target.name == "address_province" || e.target.name == "address_minimum_amount") {
            let customerAddresses = this.state.customer_address

            customerAddresses.map((item, index) => {
                if (index == e.target.dataset.index) {
                    item[e.target.name] = e.target.value
                }
            })

            this.setState({
                customer_address: customerAddresses
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
        if (this.props.customer_id) {
            submitResponse = await api.put(`/customers/${this.props.customer_id}`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(`/customers`, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.data.status != 400) {
            Swal.fire({
                title: "İşlem başarılı!",
                icon: "success"
            })

            // redirect to customer detail view if user added customer via search on header
            if (this.props.state) {
                this.setState({
                    redirect_jsx: (
                        <Redirect to={`${urls.CUSTOMER_RESULT_VIEW}/${submitResponse.data.responseData._id}`}></Redirect>
                    )
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

        // render adresses
        let adressesJsx = this.state.customer_address.map((item, index) => {
            return (
                <div className="row py-1">
                    <div className="col-lg-4">
                        <label>Adres *</label>
                        <input type="text" required class="form-control" autoComplete="off" required data-index={index} name="address" value={item.address} onChange={this.handleOnChange} placeholder="Adres giriniz" />
                    </div>
                    <div className="col-lg-3">
                        <label>Adres Tanımı </label>

                        <input type="text" class="form-control" autoComplete="off"  data-index={index} name="address_description" value={item.address_description} onChange={this.handleOnChange} placeholder="Adres tanımı giriniz" />
                    </div>
                    <div className="col-lg-2">
                        <label>Minimum Tutar *</label>
                        <input type="number" required step=".01" class="form-control" required data-index={index} name="address_minimum_amount" value={item.address_minimum_amount} onChange={this.handleOnChange} placeholder="Minimum paket tutarı giriniz" />
                    </div>
                    <div className="col-lg-2">
                        <label>İl *</label>
                        <select required className="form-control" data-index={index} name="address_province" value={item.address_province} onChange={this.handleOnChange}>
                            <option value="" disabled selected>İl Seçiniz</option>
                            <option value="Sivas">Sivas</option>
                            <option value="Kayseri">Kayseri</option>
                        </select>
                    </div>
                    <div className="col-lg-1">
                        <label>İşlem</label>
                        <br></br>
                        <button type="button" className="btn btn-danger" onClick={this.handleOnClickDeleteAddress} data-index={index}><i className="fas fa-trash"></i></button>
                    </div>
                </div>
            )
        })


        if (this.state.redirect_jsx != '') {
            return (
                this.state.redirect_jsx
            )
        } else {
            return (
                <form method="POST" onSubmit={this.handleOnSubmit}>
                    {this.state.redirect_jsx}
                    <div class="form-group">
                        <div className="row">
                            <div className="col-lg-4">
                                <label>Adı *</label>
                                <input type="text" required class="form-control" name="customer_name" value={this.state.customer_name} onChange={this.handleOnChange} />
                            </div>
                            <div className="col-lg-4">
                                <div class="form-group">
                                    <label>Telefon Numarası *</label>
                                    <input type="number" class="form-control" required name="customer_phone_number" value={this.state.customer_phone_number} onChange={this.handleOnChange} />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div class="form-group">
                                    <label>E-posta Adresi</label>
                                    <input type="email" class="form-control" name="customer_email_address" value={this.state.customer_email_address} onChange={this.handleOnChange} />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="form-group">
                        <label>
                            Adresler *
                        </label>
                        <button type="button" className="btn btn-sm btn-success ml-2" onClick={this.handleOnClickNewAddress}><i className="fas fa-plus"></i> Adres Ekle</button>
                        {adressesJsx}
                    </div>
                    <div class="form-group">
                        <label>Not</label>
                        <input type="text" class="form-control" name="customer_note" value={this.state.customer_note} onChange={this.handleOnChange} />
                    </div>





                    <div class="text-right">
                        <button type="submit" class="btn btn-primary">Kaydet <i className="fas fa-save"></i></button>
                    </div>
                </form>
            )
        }

    }
}

export default FormCustomer