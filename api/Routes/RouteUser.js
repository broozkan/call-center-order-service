const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const UserModel = require('../Models/ModelUser')
const jwt = require('jsonwebtoken')



// loginn
router.post('/', async (req, res) => {
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

module.exports = router;
