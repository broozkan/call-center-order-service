const ProductModel = require('../Models/ModelProduct')


class Product {
    constructor(product_name, product_category, product_unit, product_office, product_unit_price, product_photo, product_properties, is_product_available, product_order_number) {
        this.product_id = ''
        this.product_name = product_name
        this.product_category = product_category
        this.product_unit = product_unit
        this.product_office = product_office
        this.product_unit_price = product_unit_price
        this.product_photo = product_photo
        this.product_properties = product_properties
        this.is_product_available = is_product_available
        this.product_order_number = product_order_number

    }

    setProductId(product_id) {
        this.product_id = product_id
    }


    async save(cb) {
        const savedProduct = new ProductModel.productModel(this)

        await savedProduct.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedProduct,
                    status: 201
                })
            }
        })
    }


    async update(cb) {

        if (this.product_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }


        await ProductModel.productModel.findByIdAndUpdate(
            { _id: this.product_id },
            this
            , (err, updatedProduct) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedProduct
                    })
                }
            })
    }



    async delete(cb) {
        await ProductModel.productModel.deleteOne({ _id: this.product_id }, (err) => {
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

module.exports = Product