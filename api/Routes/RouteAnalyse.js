const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const OrderModel = require('../Models/ModelOrder')



// get order analyse
router.get('/', async (req, res) => {

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
            idObject = { office: "$order_office" }
        }

        if (req.query["employee_analyses"]) {
            idObject = { user: "$order_user" }
        }

        if (req.query["product_analyses"]) {
            unwind = {
                $unwind: "$order_products"
            }
            idObject = { product: "$order_products.product" }
            total = {
                $sum: { $multiply: ["$order_products.product_piece", "$order_products.product.product_unit_price"] }
            }
            matchObject = {
                $match: {
                    order_created_at: dateObject,
                    'order_office._id': mongoose.Types.ObjectId(req.query["order_office._id"])
                }
            }
        }




    }



    const aggregate = OrderModel.orderModel.aggregate([
        unwind,
        matchObject,
        {
            $group: {
                _id: idObject,
                total
            }
        }
    ])

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
