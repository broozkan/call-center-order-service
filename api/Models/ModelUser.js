const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const Office = require('./ModelOffice')

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: [true, "Müşteri adı zorunludur"]
    },
    user_email_address: {
        type: String,
        required: false
    },
    user_password: {
        type: String,
        required: false
    },
    user_office: Office.officeSchema,
    user_type: {
        type: String,
        required: true,
        enum: ["call_center_user", "office_user", "super_user"]
    },
    user_created_at: {
        type: Date,
        default: Date.now()
    },
})

userSchema.plugin(aggregatePaginate);


module.exports.userSchema = userSchema
module.exports.userModel = mongoose.model('User', userSchema)