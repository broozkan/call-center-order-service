const CategoryModel = require('../Models/ModelCategory')


class Category {
    constructor(category_name, category_order_priority_number) {
        this.category_id = ''
        this.category_name = category_name
        this.category_order_priority_number = category_order_priority_number

    }

    setCategoryId(category_id) {
        this.category_id = category_id
    }


    async save(cb) {
        const savedCategory = new CategoryModel.categoryModel(this)

        await savedCategory.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedCategory,
                    status: 400
                })
            }
        })
    }


    async update(cb) {

        if (this.category_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await CategoryModel.categoryModel.findByIdAndUpdate(
            { _id: this.category_id },
            this

            , (err, updatedCategory) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedCategory
                    })
                }
            })
    }


    async delete(cb) {
        await CategoryModel.categoryModel.deleteOne({ _id: this.category_id }, (err) => {
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

module.exports = Category