const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const CustomerModel = require('../Models/ModelCustomer')
const Customer = require('../Classes/ClassCustomer')



// get customer list
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
    const aggregate = CustomerModel.customerModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 10
    }

    CustomerModel.customerModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific customer
router.get('/get/:customerId', async (req, res) => {
    CustomerModel.customerModel.findById(req.params.customerId, (err, result) => {
        res.send(result)
    })
})



router.post('/', async (req, res) => {

    const customer = new Customer(
        req.body.customer_name,
        req.body.customer_province,
        req.body.customer_email_address,
        req.body.customer_phone_number,
        req.body.customer_address,
        req.body.customer_address_description,
        req.body.customer_note
    )


    customer.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:customerId', async (req, res) => {


    const customer = new Customer(
        req.body.customer_name,
        req.body.customer_province,
        req.body.customer_email_address,
        req.body.customer_phone_number,
        req.body.customer_address,
        req.body.customer_address_description,
        req.body.customer_note
    )

    await customer.setCustomerId(req.params.customerId)

    await customer.update((result) => {
        res.send(result)
    })
})


router.delete('/:customerId', async (req, res) => {

    const customer = new Customer

    await customer.setCustomerId(req.params.customerId)

    await customer.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
