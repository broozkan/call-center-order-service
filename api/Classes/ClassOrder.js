const OrderModel = require('../Models/ModelOrder')


class Order {
    constructor(order_customer, order_address, order_products, order_office, order_amount, order_payment_method, order_note, order_user) {
        this.order_id = ''
        this.order_code = parseInt(Math.floor(Math.random() * 1000))
        this.order_customer = order_customer
        this.order_address = order_address
        this.order_products = order_products
        this.order_office = order_office
        this.order_amount = order_amount
        this.order_payment_method = order_payment_method
        this.order_note = order_note
        this.order_user = order_user
        this.order_date = new Date().toLocaleString('tr-TR', {
            timeZone: 'Europe/Istanbul'
        })
    }

    setOrderId(order_id) {
        this.order_id = order_id
    }


    async save(cb) {
        const savedOrder = new OrderModel.orderModel(this)

        await savedOrder.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedOrder,
                    status: 201
                })
            }
        })
    }


    async update(cb) {

        if (this.order_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await OrderModel.orderModel.findByIdAndUpdate(
            { _id: this.order_id },
            this

            , (err, updatedOrder) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedOrder
                    })
                }
            })
    }



    async delete(cb) {
        await OrderModel.orderModel.deleteOne({ _id: this.order_id }, (err) => {
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

module.exports = Order