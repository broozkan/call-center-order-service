const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const OrderModel = require('../Models/ModelOrder')



// get order analyse
router.get('/', async (req, res) => {

    let pipeline = []
    let idObject = {}
    let dateObject = {}
    let matchObject = {
        $match: {
            order_created_at: dateObject
        }
    }
    let total = {
        $sum: "$order_amount"
    }
    let unwind = {}

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query["beginning_date"] && req.query["ending_date"]) {
            dateObject = {
                $gte: new Date(req.query["beginning_date"]), $lte: new Date(req.query["ending_date"])
            }
        }

        if (req.query["office_analyses"]) {
            pipeline = [
                {
                    $match: {
                        'order_status': {
                            $nin: ['cancelled', 'cancellation_approved']
                        }
                    }
                },
                {
                    $group: {
                        _id: { office: "$order_office" },
                        total
                    }
                }
            ]
        }

        if (req.query["employee_analyses"]) {
            pipeline = [
                {
                    $match: {
                        'order_status': {
                            $nin: ['cancelled', 'cancellation_approved']
                        }
                    }
                },
                {
                    $group: {
                        _id: { user: "$order_user" },
                        total
                    }
                }
            ]
        }

        if (req.query["product_analyses"]) {
            pipeline = [
                {
                    $unwind: "$order_products"
                },
                {
                    $match: {
                        order_created_at: dateObject,
                        'order_office._id': mongoose.Types.ObjectId(req.query["order_office._id"]),
                        'order_status': {
                            $nin: ['cancelled', 'cancellation_approved']
                        }
                    }
                },
                {
                    $group: {
                        _id: { product: "$order_products.product" },
                        total: {
                            $sum: { $multiply: ["$order_products.product_piece", "$order_products.product.product_unit_price"] }
                        },
                        count: {
                            $sum: "$order_products.product_piece"
                        }

                    }
                }

            ]
            // unwind = {
            //     $unwind: "$order_products"
            // }
            // idObject = { product: "$order_products.product" }
            // total = {
            //     $sum: { $multiply: ["$order_products.product_piece", "$order_products.product.product_unit_price"] }
            // }
            // matchObject = {
            //     $match: {
            //         order_created_at: dateObject,
            //         'order_office._id': mongoose.Types.ObjectId(req.query["order_office._id"])
            //     }
            // }
        }
    }



    const aggregate = OrderModel.orderModel.aggregate(pipeline)

    const options = {
        page: req.params.page,
        limit: 10
    }

    OrderModel.orderModel.aggregatePaginate(aggregate, options, (err, result) => {
        console.log(result);
        console.log(err);
        res.send(result)
    })
})



module.exports = router;
