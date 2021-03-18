const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const EmployeeModel = require('../Models/ModelEmployee')
const Employee = require('../Classes/ClassEmployee')



// get employee list
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
    const aggregate = EmployeeModel.employeeModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 10
    }

    EmployeeModel.employeeModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific employee
router.get('/get/:employeeId', async (req, res) => {
    EmployeeModel.employeeModel.findById(req.params.employeeId, (err, result) => {
        res.send(result)
    })
})



router.post('/', async (req, res) => {

    const employee = new Employee(
        req.body.employee_name,
        req.body.employee_province,
        req.body.employee_email_address,
        req.body.employee_phone_number,
        req.body.employee_address,
        req.body.employee_id_number,
        req.body.employee_password
    )


    employee.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:employeeId', async (req, res) => {


    const employee = new Employee(
        req.body.employee_name,
        req.body.employee_province,
        req.body.employee_email_address,
        req.body.employee_phone_number,
        req.body.employee_address,
        req.body.employee_id_number,
        req.body.employee_password
    )

    await employee.setEmployeeId(req.params.employeeId)

    await employee.update((result) => {
        res.send(result)
    })
})


router.delete('/:employeeId', async (req, res) => {

    const employee = new Employee

    await employee.setEmployeeId(req.params.employeeId)

    await employee.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
