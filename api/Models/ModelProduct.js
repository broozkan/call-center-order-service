const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const Category = require('./ModelCategory')
const Office = require('./ModelOffice')

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: [true, "Ürün adı zorunludur"]
    },
    product_category: Category.categorySchema,
    product_unit: {
        type: String,
        required: [true, "Ürün birimi zorunludur"]
    },
    product_office: Office.officeSchema,
    product_unit_price: {
        type: Number,
        required: true
    },
    product_photo: {
        type: Object,
        required: false
    },
    product_properties: {
        type: Array,
        required: false
    },
    is_product_available: {
        type: Boolean,
        required: [true, "Müşteri stok bilgisi zorunludur"]
    },
    product_order_number: {
        type: Number,
        required: true
    }
})

productSchema.plugin(aggregatePaginate);


module.exports.productSchema = productSchema
module.exports.productModel = mongoose.model('Product', productSchema)