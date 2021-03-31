const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const paymentMethodSchema = mongoose.Schema({
    payment_method_name: {
        type: String,
        required: [true, "Ödeme tipi adı zorunludur"]
    },
    payment_method_order_priority_number: {
        type: Number,
        required: [true, "Sıralama numarası zorunludur"]
    }
})

paymentMethodSchema.plugin(aggregatePaginate);


module.exports.paymentMethodSchema = paymentMethodSchema
module.exports.paymentMethodModel = mongoose.model('PaymentMethod', paymentMethodSchema)