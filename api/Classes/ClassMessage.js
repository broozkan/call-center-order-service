const MessageModel = require('../Models/ModelMessage')


class Message {
    constructor(message, message_sender, message_receiver, message_chat) {
        this.message_id = ''
        this.message = message
        this.message_sender = message_sender
        this.message_receiver = message_receiver
        this.message_chat = message_chat

    }

    setMessageId(message_id) {
        this.message_id = message_id
    }


    async save(cb) {
        const savedMessage = new MessageModel.messageModel(this)

        await savedMessage.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedMessage,
                    status: 201
                })
            }
        })
    }


    async update(cb) {

        if (this.message_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await MessageModel.messageModel.findByIdAndUpdate(
            { _id: this.message_id },
            this

            , (err, updatedMessage) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedMessage
                    })
                }
            })
    }



    async delete(cb) {
        await MessageModel.messageModel.deleteOne({ _id: this.message_id }, (err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err
                })
            } else {
                cb({
                    response: true,
                    responseData: "Başarılı"
                })
            }
        })
    }
}

module.exports = Message