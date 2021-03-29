const ChatModel = require('../Models/ModelChat')


class Chat {
    constructor(chat_host_user, chat_client_user) {
        this.chat_id = ''
        this.chat_host_user = chat_host_user
        this.chat_client_user = chat_client_user
    }

    setChatId(chat_id) {
        this.chat_id = chat_id
    }


    async save(cb) {
        const savedChat = new ChatModel.chatModel(this)

        await savedChat.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message
                })
            } else {
                cb({
                    response: true,
                    responseData: savedChat
                })
            }
        })
    }


    async update(cb) {

        if (this.chat_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await ChatModel.chatModel.findByIdAndUpdate(
            { _id: this.chat_id },
            this

            , (err, updatedChat) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedChat
                    })
                }
            })
    }



    async delete(cb) {
        await ChatModel.chatModel.deleteOne({ _id: this.chat_id }, (err) => {
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

module.exports = Chat