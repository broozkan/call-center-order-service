const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const CategoryModel = require('../Models/ModelCategory')
const Category = require('../Classes/ClassCategory')



// get category list
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
    const aggregate = CategoryModel.categoryModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 10
    }

    CategoryModel.categoryModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific category
router.get('/get/:categoryId', async (req, res) => {
    CategoryModel.categoryModel.findById(req.params.categoryId, (err, result) => {
        res.send(result)
    })
})

router.post('/', async (req, res) => {


    const category = new Category(
        req.body.category_name,
        req.body.category_order_priority_number
    )


    category.save((result) => {
        res.send(result)
    })

})


router.put('/:categoryId', async (req, res) => {


    const category = new Category(
        req.body.category_name,
        req.body.category_order_priority_number
    )

    await category.setCategoryId(req.params.categoryId)

    await category.update((result) => {
        res.send(result)
    })
})


router.delete('/:categoryId', async (req, res) => {

    const category = new Category

    await category.setCategoryId(req.params.categoryId)

    await category.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
