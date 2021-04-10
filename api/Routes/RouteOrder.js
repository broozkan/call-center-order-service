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

const WebSocket = require("ws");

const broadcast = (clients, message) => {

    clients.forEach((client) => {

        if (client.readyState === WebSocket.OPEN) {

            client.send(message);
        }
    });
};


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

        if (req.query["order_customer.customer_name"]) {
            req.query["order_customer.customer_name"] = { $regex: new RegExp(req.query["order_customer.customer_name"], "i") }
        }

        if (req.query["order_office._id"]) {
            req.query["order_office._id"] = mongoose.Types.ObjectId(req.query["order_office._id"])
        }

    }
    const aggregate = OrderModel.orderModel.aggregate([{
        $match: req.query,
    },
    {
        $sort: { _id: -1 }
    }
    ])

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



router.post('/', Controller.verifySiteToken, async (req, res) => {



    const order = new Order(
        req.body.order_customer,
        req.body.order_address,
        req.body.order_products,
        req.body.order_office,
        req.body.order_amount,
        req.body.order_payment_method,
        req.body.order_note,
        req.user
    )

    order.save((result) => {
        broadcast(req.app.locals.clients, "ORDER_STATE_CHANGED");

        res.send(result)
    })

})


router.put('/:orderId', async (req, res) => {

    broadcast(req.app.locals.clients, "ORDER_STATE_CHANGED");

    const order = new Order(
        req.body.order_customer,
        req.body.order_address,
        req.body.order_products,
        req.body.order_office,
        req.body.order_amount,
        req.body.order_payment_method,
        req.body.order_note,
        req.user
    )

    await order.setOrderId(req.params.orderId)

    await order.update((result) => {
        res.send(result)
    })
})


router.patch('/:orderId', async (req, res) => {

    broadcast(req.app.locals.clients, "ORDER_STATE_CHANGED");



    await OrderModel.orderModel.findByIdAndUpdate({ _id: req.params.orderId }, req.body, (err, updatedOrder) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message,
                status: 400
            })
        } else {
            console.log(req.body);
            if (req.body.order_status == "cancelled") {
                broadcast(req.app.locals.clients, "ORDER_CANCELLED");
            }
            res.send({
                response: true,
                responseData: updatedOrder
            })
        }
    });

})

router.delete('/:orderId', async (req, res) => {

    const order = new Order

    await order.setOrderId(req.params.orderId)

    await order.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
