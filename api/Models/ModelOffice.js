const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const officeSchema = mongoose.Schema({
    office_name: {
        type: String,
        required: [true, "Şube adı zorunludur"]
    },
    office_province: {
        type: String,
        required: [true, "Şube şehir zorunludur"]
    },
    office_address: {
        type: String,
        required: [true, "Şube adresi zorunludur"]
    },
    office_order_priority_number: {
        type: Number,
        required: [true, "Sıralama numarası zorunludur"]
    }
})

officeSchema.plugin(aggregatePaginate);


module.exports.officeSchema = officeSchema
module.exports.officeModel = mongoose.model('Office', officeSchema)