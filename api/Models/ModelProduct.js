const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: [true, "Ürün adı zorunludur"]
    },
    product_unit: {
        type: String,
        required: [true, "Ürün birimi zorunludur"]
    },
    product_unit_price: {
        type: String,
        required: [true, "Birim fiyat zorunludur"]
    },
    product_photo: {
        type: Object,
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