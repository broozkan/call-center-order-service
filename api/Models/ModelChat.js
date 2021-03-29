const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const User = require('./ModelUser')

const chatSchema = mongoose.Schema({
    chat_host_user: User.userSchema,
    chat_client_user: User.userSchema,
    chat_created_at: {
        type: Date,
        default: Date.now()
    }

})

chatSchema.plugin(aggregatePaginate);


module.exports.chatSchema = chatSchema
module.exports.chatModel = mongoose.model('Chat', chatSchema)