const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const ProductModel = require('../Models/ModelProduct')
const Product = require('../Classes/ClassProduct')
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

// get product list
router.get('/:page', async (req, res) => {

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }

        if (req.query["product_category._id"]) {
            req.query["product_category._id"] = mongoose.Types.ObjectId(req.query["product_category._id"])
        }

        if (req.query["product_office._id"]) {
            req.query["product_office._id"] = mongoose.Types.ObjectId(req.query["product_office._id"])
        }

        if (req.query["is_product_available"]) {
            req.query["is_product_available"] = !(req.query["is_product_available"] == 'false')
        }




    }
    const aggregate = ProductModel.productModel.aggregate([
        {
            $match: req.query,
        },
        {
            $sort: { product_order_number: 1 }
        }
    ])

    const options = {
        page: req.params.page,
        limit: 10
    }

    ProductModel.productModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific product
router.get('/get/:productId', async (req, res) => {
    ProductModel.productModel.findById(req.params.productId, (err, result) => {
        res.send(result)
    })
})


router.patch('/:productId', async (req, res) => {

    await ProductModel.productModel.findByIdAndUpdate({ _id: req.params.productId }, req.body, (err, updatedProduct) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message,
                status: 400
            })
        } else {
            broadcast(req.app.locals.clients, "PRODUCT_STOCK_CHANGED");

            res.send({
                response: true,
                responseData: updatedProduct
            })
        }
    });
})


router.post('/', MultipartyMiddleware, async (req, res) => {

    req.body = JSON.parse(req.body.data)

    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)


        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: "Dosya y??klenemedi"
                })
                res.end()

                return false
            } else {
                fs.unlink(tmp_path, (err) => {

                })

            }
        })

        req.body.product_photo = req.files.file
    }



    const product = new Product(
        req.body.product_name,
        req.body.product_category,
        req.body.product_unit,
        req.body.product_office,
        req.body.product_unit_price,
        req.body.product_photo,
        req.body.product_properties,
        req.body.is_product_available,
        req.body.product_order_number
    )


    product.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:productId', MultipartyMiddleware, async (req, res) => {


    req.body = JSON.parse(req.body.data)

    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)


        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: "Dosya y??klenemedi"
                })
                res.end()

                return false
            } else {
                fs.unlink(tmp_path, (err) => {

                })

            }
        })

        req.body.product_photo = req.files.file
    }


    const product = new Product(
        req.body.product_name,
        req.body.product_category,
        req.body.product_unit,
        req.body.product_office,
        req.body.product_unit_price,
        req.body.product_photo,
        req.body.product_properties,
        req.body.is_product_available,
        req.body.product_order_number
    )

    await product.setProductId(req.params.productId)

    await product.update((result) => {
        res.send(result)
    })
})


router.delete('/:productId', async (req, res) => {

    const product = new Product

    await product.setProductId(req.params.productId)

    await product.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
