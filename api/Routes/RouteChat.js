const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const ChatModel = require('../Models/ModelChat')
const Chat = require('../Classes/ClassChat')



// get chat list
router.get('/:page', async (req, res) => {

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)


        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }

    }
    const aggregate = ChatModel.chatModel.aggregate([{
        $match: req.query
    }])

    const options = {
        page: req.params.page,
        limit: 10
    }

    ChatModel.chatModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific chat
router.get('/get/:chatId', async (req, res) => {
    ChatModel.chatModel.findById(req.params.chatId, (err, result) => {
        res.send(result)
    })
})



router.post('/', async (req, res) => {

    const chat = new Chat(
        req.body.chat_host_user,
        req.body.chat_client_user
    )


    chat.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:chatId', async (req, res) => {


    const chat = new Chat(
        req.body.chat_host_user,
        req.body.chat_client_user
    )

    await chat.setChatId(req.params.chatId)

    await chat.update((result) => {
        res.send(result)
    })
})


router.delete('/:chatId', async (req, res) => {

    const chat = new Chat

    await chat.setChatId(req.params.chatId)

    await chat.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
