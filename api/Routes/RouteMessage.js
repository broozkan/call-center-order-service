const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const MessageModel = require('../Models/ModelMessage')
const Message = require('../Classes/ClassMessage')



// get message list
router.get('/:page', async (req, res) => {

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query["message_chat._id"]) {
            req.query["message_chat._id"] = mongoose.Types.ObjectId(req.query["message_chat._id"])
        }
    }
    const aggregate = MessageModel.messageModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 1000
    }

    MessageModel.messageModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific message
router.get('/get/:messageId', async (req, res) => {
    MessageModel.messageModel.findById(req.params.messageId, (err, result) => {
        res.send(result)
    })
})



router.post('/', async (req, res) => {

    const message = new Message(
        req.body.message,
        req.body.message_sender,
        req.body.message_receiver,
        req.body.message_chat
    )


    message.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:messageId', async (req, res) => {


    const message = new Message(
        req.body.message,
        req.body.message_sender,
        req.body.message_receiver,
        req.body.message_chat
    )

    await message.setMessageId(req.params.messageId)

    await message.update((result) => {
        res.send(result)
    })
})


router.delete('/:messageId', async (req, res) => {

    const message = new Message

    await message.setMessageId(req.params.messageId)

    await message.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
