const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const Address = require('./ModelAddress')

const customerSchema = mongoose.Schema({
    customer_name: {
        type: String,
        required: [true, "Müşteri adı zorunludur"]
    },
    customer_email_address: {
        type: String,
        required: false
    },
    customer_phone_number: {
        type: String,
        required: [true, "Müşteri telefon numarası zorunludur"]
    },
    customer_address: [Address.addressSchema],
    customer_note: {
        type: String,
        required: false
    },
    customer_created_at: {
        type: Date,
        default: Date.now()
    },
})

customerSchema.plugin(aggregatePaginate);


module.exports.customerSchema = customerSchema
module.exports.customerModel = mongoose.model('Customer', customerSchema)