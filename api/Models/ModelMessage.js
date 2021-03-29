const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const User = require('./ModelUser')
const Chat = require('./ModelChat')

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: [true, "Mesaj zorunludur"]
    },
    message_chat: Chat.chatSchema,
    message_sender: User.userSchema,
    message_receiver: User.userSchema,
    is_message_read: {
        type: Boolean,
        default: false
    },
    message_date: {
        type: Date,
        default: Date.now()
    },
})

messageSchema.plugin(aggregatePaginate);


module.exports.messageSchema = messageSchema
module.exports.messageModel = mongoose.model('Message', messageSchema)