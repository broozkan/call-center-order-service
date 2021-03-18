const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const employeeSchema = mongoose.Schema({
    employee_name: {
        type: String,
        required: [true, "Çalışan adı zorunludur"]
    },
    employee_province: {
        type: String,
        required: [true, "Çalışan şehiri zorunludur"]
    },
    employee_email_address: {
        type: String,
        required: [true, "Çalışan e-posta adresi zorunludur"]
    },
    employee_phone_number: {
        type: String,
        required: [true, "Çalışan telefon numarası zorunludur"]
    },
    employee_address: {
        type: String,
        required: false
    },
    employee_id_number: {
        type: Number,
        required: false
    },
    employee_password: {
        type: String,
        required: [true, "Çalışan parolası zorunludur"]
    },
    employee_started_at: {
        type: Date,
        default: Date.now()
    },
})

employeeSchema.plugin(aggregatePaginate);


module.exports.employeeSchema = employeeSchema
module.exports.employeeModel = mongoose.model('Employee', employeeSchema)