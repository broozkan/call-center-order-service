const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const UserModel = require('../Models/ModelUser')
const User = require('../Classes/ClassUser')
const jwt = require('jsonwebtoken')



// loginn
router.post('/login', async (req, res) => {
    let authHeader = req.headers.authorization;


    var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const user_email_address = auth[0]
    const password = auth[1]


    const filters = {
        user_email_address: user_email_address,
        user_password: password
    }

    await UserModel.userModel.find(filters, (err, user) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message,
                status: 400
            })
        } else {

            if (user.length > 0) {
                // success authentication
                // create token
                const token = jwt.sign({ userData: user }, process.env.TOKEN_SECRET)
                res.header('auth-token', token)



                res.send({
                    response: true,
                    token: token,
                    responseData: user,
                    status: 200
                })
            } else {
                res.send({
                    response: false,
                    responseData: "Kullanıcı adı veya parola hatalı!",
                    status: 400
                })
            }

        }

    })


})


router.post('/', async (req, res) => {

    const user = new User(
        req.body.user_name,
        req.body.user_email_address,
        req.body.user_password,
        req.body.user_office,
        req.body.user_type
    )


    user.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:userId', async (req, res) => {


    const user = new User(
        req.body.user_name,
        req.body.user_email_address,
        req.body.user_password,
        req.body.user_office,
        req.body.user_type
    )

    await user.setUserId(req.params.userId)

    await user.update((result) => {
        res.send(result)
    })
})


router.delete('/:userId', async (req, res) => {

    const user = new User

    await user.setUserId(req.params.userId)

    await user.delete((result) => {
        res.send(result)
    })

})


// get user list
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
    const aggregate = UserModel.userModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 10
    }

    UserModel.userModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

module.exports = router;
