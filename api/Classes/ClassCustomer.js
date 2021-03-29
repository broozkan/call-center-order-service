const CustomerModel = require('../Models/ModelCustomer')


class Customer {
    constructor(customer_name, customer_province, customer_email_address, customer_phone_number, customer_address, customer_note) {
        this.customer_id = ''
        this.customer_name = customer_name
        this.customer_province = customer_province
        this.customer_email_address = customer_email_address
        this.customer_phone_number = customer_phone_number
        this.customer_address = customer_address
        this.customer_note = customer_note

    }

    setCustomerId(customer_id) {
        this.customer_id = customer_id
    }


    async save(cb) {
        const savedCustomer = new CustomerModel.customerModel(this)

        await savedCustomer.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedCustomer,
                    status: 201
                })
            }
        })
    }


    async update(cb) {

        if (this.customer_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await CustomerModel.customerModel.findByIdAndUpdate(
            { _id: this.customer_id },
            this

            , (err, updatedCustomer) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedCustomer
                    })
                }
            })
    }



    async delete(cb) {
        await CustomerModel.customerModel.deleteOne({ _id: this.customer_id }, (err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err
                })
            } else {
                cb({
                    response: true,
                    responseData: "Başarılı"
                })
            }
        })
    }
}

module.exports = Customer