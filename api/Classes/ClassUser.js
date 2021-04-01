const UserModel = require('../Models/ModelUser')


class User {
    constructor(user_name, user_email_address, user_password, user_office, user_type) {
        this.user_id = ''
        this.user_name = user_name
        this.user_email_address = user_email_address
        this.user_password = user_password
        this.user_office = user_office
        this.user_type = user_type

    }

    setUserId(user_id) {
        this.user_id = user_id
    }


    async save(cb) {
        const savedUser = new UserModel.userModel(this)

        await savedUser.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message
                })
            } else {
                cb({
                    response: true,
                    responseData: savedUser
                })
            }
        })
    }


    async update(cb) {

        if (this.user_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await UserModel.userModel.findByIdAndUpdate(
            { _id: this.user_id },
            this

            , (err, updatedUser) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedUser
                    })
                }
            })
    }



    async delete(cb) {
        await UserModel.userModel.deleteOne({ _id: this.user_id }, (err) => {
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

module.exports = User