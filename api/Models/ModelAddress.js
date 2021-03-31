const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const addressSchema = mongoose.Schema({
    address: {
        type: String,
        required: [true, "Adres zorunludur"]
    },
    address_description: {
        type: String,
        required: false
    },
    address_minimum_amount: {
        type: Number,
        required: true
    },
    address_province: {
        type: String,
        required: [true, "Adres şehiri zorunludur"]
    }
})

addressSchema.plugin(aggregatePaginate);


module.exports.addressSchema = addressSchema
module.exports.addressModel = mongoose.model('Address', addressSchema)