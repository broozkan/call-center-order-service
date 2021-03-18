const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const CustomerModel = require('./ModelCustomer')
const OfficeModel = require('./ModelOffice')

const orderSchema = mongoose.Schema({
    order_code: {
        type: String,
        default: Math.floor(Math.random() * 1000)
    },
    order_customer: CustomerModel.customerSchema,
    order_products: {
        type: Array,
        required: [true, "Sipariş içeriği zorunludur"]
    },
    order_office: OfficeModel.officeSchema,
    order_amount: {
        type: Number,
        required: [true, "Sipariş tutarı zorunludur"]
    },
    order_status: {
        type: String,
        default: "Bekliyor"
    },
    order_created_at: {
        type: Date,
        default: Date.now()
    }
})

orderSchema.plugin(aggregatePaginate);


module.exports.orderSchema = orderSchema
module.exports.orderModel = mongoose.model('Order', orderSchema)