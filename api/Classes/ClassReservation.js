const ReservationModel = require('../Models/ModelReservation')


class Reservation {
    constructor(reservation_customer, reservation_office, reservation_date) {
        this.reservation_id = ''
        this.reservation_customer = reservation_customer
        this.reservation_office = reservation_office
        this.reservation_date = reservation_date

    }

    setReservationId(reservation_id) {
        this.reservation_id = reservation_id
    }


    async save(cb) {
        const savedReservation = new ReservationModel.reservationModel({
            reservation_customer: this.reservation_customer,
            reservation_office: this.reservation_office,
            reservation_date: this.reservation_date
        })

        await savedReservation.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedReservation,
                    status: 201
                })
            }
        })
    }


    async update(cb) {

        if (this.reservation_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await ReservationModel.reservationModel.findByIdAndUpdate(
            { _id: this.reservation_id },
            this

            , (err, updatedReservation) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message,
                        status: 400
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedReservation,
                        status: 204
                    })
                }
            })
    }



    async delete(cb) {
        await ReservationModel.reservationModel.deleteOne({ _id: this.reservation_id }, (err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err
                })
            } else {
                cb({
                    response: true,
                    responseData: "Başarılı"
                })
            }
        })
    }
}

module.exports = Reservation