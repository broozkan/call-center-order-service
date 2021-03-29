const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: [true, "Kategori adı zorunludur"]
    },
    category_order_priority_number: {
        type: Number,
        required: [true, "Sıralama numarası zorunludur"]
    }
})

categorySchema.plugin(aggregatePaginate);


module.exports.categorySchema = categorySchema
module.exports.categoryModel = mongoose.model('Category', categorySchema)