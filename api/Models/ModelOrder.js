const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const CustomerModel = require('./ModelCustomer')
const OfficeModel = require('./ModelOffice')
const UserModel = require('./ModelUser')
const PaymentMethodModel = require('./ModelPaymentMethod')
const AddressModel = require('./ModelAddress')

const checkOrderProductsLength = (val) => {
    if (val.length < 1) {
        return false
    }
}

const orderSchema = mongoose.Schema({
    order_code: {
        type: String,
        required: true
    },
    order_customer: CustomerModel.customerSchema,
    order_address: AddressModel.addressSchema,
    order_products: {
        type: Array,
        required: [true, "Sipariş içeriği zorunludur"],
        validate: [checkOrderProductsLength, 'Sipariş içeriği zorunludur']
    },
    order_office: OfficeModel.officeSchema,
    order_amount: {
        type: Number,
        required: [true, "Sipariş tutarı zorunludur"]
    },
    order_payment_method: PaymentMethodModel.paymentMethodSchema,
    order_note: {
        type: String,
        required: false
    },
    order_status: {
        type: String,
        default: "pending",
        enum: [
            "pending",
            "preparing",
            "on_delivery",
            "delivered",
            "cancelled",
            "cancellation_accepted"
        ]
    },
    order_created_at: {
        type: Date,
        default: Date.now()
    },
    order_user: UserModel.userSchema
})



orderSchema.plugin(aggregatePaginate);


module.exports.orderSchema = orderSchema
module.exports.orderModel = mongoose.model('Order', orderSchema)