const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const CustomerModel = require('./ModelCustomer')
const OfficeModel = require('./ModelOffice')

const reservationSchema = mongoose.Schema({
    reservation_code: {
        type: String,
        default: `REZ-${Math.floor(Math.random() * 1000)}`
    },
    reservation_customer: CustomerModel.customerSchema,
    reservation_office: OfficeModel.officeSchema,
    reservation_date: {
        type: String,
        required: [true, "Rezervasyon tarihi zorunludur"]
    },
    reservation_created_at: {
        type: Date,
        default: Date.now()
    }
})

reservationSchema.plugin(aggregatePaginate);


module.exports.reservationSchema = reservationSchema
module.exports.reservationModel = mongoose.model('Reservation', reservationSchema)