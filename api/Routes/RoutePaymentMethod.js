const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const PaymentMethodModel = require('../Models/ModelPaymentMethod')
const PaymentMethod = require('../Classes/ClassPaymentMethod')



// get paymentMethod list
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
    const aggregate = PaymentMethodModel.paymentMethodModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 10
    }

    PaymentMethodModel.paymentMethodModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific paymentMethod
router.get('/get/:paymentMethodId', async (req, res) => {
    PaymentMethodModel.paymentMethodModel.findById(req.params.paymentMethodId, (err, result) => {
        res.send(result)
    })
})

router.post('/', async (req, res) => {


    const paymentMethod = new PaymentMethod(
        req.body.payment_method_name,
        req.body.payment_method_order_priority_number
    )


    paymentMethod.save((result) => {
        res.send(result)
    })

})


router.put('/:paymentMethodId', async (req, res) => {


    const paymentMethod = new PaymentMethod(
        req.body.payment_method_name,
        req.body.payment_method_order_priority_number
    )

    await paymentMethod.setPaymentMethodId(req.params.paymentMethodId)

    await paymentMethod.update((result) => {
        res.send(result)
    })
})


router.delete('/:paymentMethodId', async (req, res) => {

    const paymentMethod = new PaymentMethod

    await paymentMethod.setPaymentMethodId(req.params.paymentMethodId)

    await paymentMethod.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
