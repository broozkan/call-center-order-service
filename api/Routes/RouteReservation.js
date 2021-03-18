const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const ReservationModel = require('../Models/ModelReservation')
const Reservation = require('../Classes/ClassReservation')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');


// get reservation list
router.get('/:page', async (req, res) => {

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }

    }
    const aggregate = ReservationModel.reservationModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 10
    }

    ReservationModel.reservationModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific reservation
router.get('/get/:reservationId', async (req, res) => {
    ReservationModel.reservationModel.findById(req.params.reservationId, (err, result) => {
        res.send(result)
    })
})



router.post('/', async (req, res) => {


    const reservation = new Reservation(
        req.body.reservation_customer,
        req.body.reservation_office,
        req.body.reservation_date
    )

    console.log(reservation);
    reservation.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:reservationId', async (req, res) => {


    const reservation = new Reservation(
        req.body.reservation_customer,
        req.body.reservation_office,
        req.body.reservation_date
    )

    await reservation.setReservationId(req.params.reservationId)

    await reservation.update((result) => {
        res.send(result)
    })
})


router.delete('/:reservationId', async (req, res) => {

    const reservation = new Reservation

    await reservation.setReservationId(req.params.reservationId)

    await reservation.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
