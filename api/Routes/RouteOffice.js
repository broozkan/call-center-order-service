const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const OfficeModel = require('../Models/ModelOffice')
const Office = require('../Classes/ClassOffice')



// get office list
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
    const aggregate = OfficeModel.officeModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 10
    }

    OfficeModel.officeModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific office
router.get('/get/:officeId', async (req, res) => {
    OfficeModel.officeModel.findById(req.params.officeId, (err, result) => {
        res.send(result)
    })
})

router.post('/', async (req, res) => {


    const office = new Office(
        req.body.office_name,
        req.body.office_province,
        req.body.office_address,
        req.body.office_order_priority_number
    )


    office.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:officeId', async (req, res) => {


    const office = new Office(
        req.body.office_name,
        req.body.office_province,
        req.body.office_address,
        req.body.office_order_priority_number
    )

    await office.setOfficeId(req.params.officeId)

    await office.update((result) => {
        res.send(result)
    })
})


router.delete('/:officeId', async (req, res) => {

    const office = new Office

    await office.setOfficeId(req.params.officeId)

    await office.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
