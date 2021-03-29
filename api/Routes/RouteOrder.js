const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const OrderModel = require('../Models/ModelOrder')
const Order = require('../Classes/ClassOrder')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');


// get order list
router.get('/:page', async (req, res) => {

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }

        if (req.query["order_customer._id"]) {
            req.query["order_customer._id"] = mongoose.Types.ObjectId(req.query["order_customer._id"])
        }

    }
    const aggregate = OrderModel.orderModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 10
    }

    OrderModel.orderModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific order
router.get('/get/:orderId', async (req, res) => {
    OrderModel.orderModel.findById(req.params.orderId, (err, result) => {
        res.send(result)
    })
})



router.post('/', async (req, res) => {


    const order = new Order(
        req.body.order_customer,
        req.body.order_products,
        req.body.order_office,
        req.body.order_amount
    )

    console.log(order);
    order.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:orderId', async (req, res) => {


    const order = new Order(
        req.body.order_customer,
        req.body.order_orders,
        req.body.order_office,
        req.body.order_amount
    )

    await order.setOrderId(req.params.orderId)

    await order.update((result) => {
        res.send(result)
    })
})


router.delete('/:orderId', async (req, res) => {

    const order = new Order

    await order.setOrderId(req.params.orderId)

    await order.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
