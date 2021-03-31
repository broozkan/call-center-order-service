const PaymentMethodModel = require('../Models/ModelPaymentMethod')


class PaymentMethod {
    constructor(payment_method_name, payment_method_order_priority_number) {
        this.payment_method_id = ''
        this.payment_method_name = payment_method_name
        this.payment_method_order_priority_number = payment_method_order_priority_number

    }

    setPaymentMethodId(payment_method_id) {
        this.payment_method_id = payment_method_id
    }


    async save(cb) {
        const savedPaymentMethod = new PaymentMethodModel.paymentMethodModel(this)

        await savedPaymentMethod.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedPaymentMethod,
                    status: 400
                })
            }
        })
    }


    async update(cb) {

        if (this.payment_method_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await PaymentMethodModel.paymentMethodModel.findByIdAndUpdate(
            { _id: this.payment_method_id },
            this

            , (err, updatedPaymentMethod) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedPaymentMethod
                    })
                }
            })
    }


    async delete(cb) {
        await PaymentMethodModel.paymentMethodModel.deleteOne({ _id: this.payment_method_id }, (err) => {
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

module.exports = PaymentMethod