const OfficeModel = require('../Models/ModelOffice')


class Office {
    constructor(office_name, office_province, office_address, office_order_priority_number) {
        this.office_id = ''
        this.office_name = office_name
        this.office_province = office_province
        this.office_address = office_address
        this.office_order_priority_number = office_order_priority_number

    }

    setOfficeId(office_id) {
        this.office_id = office_id
    }


    async save(cb) {
        const savedOffice = new OfficeModel.officeModel({
            office_name: this.office_name,
            office_province: this.office_province,
            office_address: this.office_address,
            office_order_priority_number: this.office_order_priority_number
        })

        await savedOffice.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message
                })
            } else {
                cb({
                    response: true,
                    responseData: savedOffice
                })
            }
        })
    }


    async update(cb) {

        if (this.office_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await OfficeModel.officeModel.findByIdAndUpdate(
            { _id: this.office_id },
            this

            , (err, updatedOffice) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedOffice
                    })
                }
            })
    }


    async delete(cb) {
        await OfficeModel.officeModel.deleteOne({ _id: this.office_id }, (err) => {
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

module.exports = Office