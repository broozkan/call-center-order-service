const EmployeeModel = require('../Models/ModelEmployee')


class Employee {
    constructor(employee_name, employee_province, employee_email_address, employee_phone_number, employee_address, employee_id_number, employee_password) {
        this.employee_id = ''
        this.employee_name = employee_name
        this.employee_province = employee_province
        this.employee_email_address = employee_email_address
        this.employee_phone_number = employee_phone_number
        this.employee_address = employee_address
        this.employee_id_number = employee_id_number
        this.employee_password = employee_password

    }

    setEmployeeId(employee_id) {
        this.employee_id = employee_id
    }


    async save(cb) {
        const savedEmployee = new EmployeeModel.employeeModel({
            employee_name: this.employee_name,
            employee_province: this.employee_province,
            employee_email_address: this.employee_email_address,
            employee_phone_number: this.employee_phone_number,
            employee_address: this.employee_address,
            employee_id_number: this.employee_id_number,
            employee_password: this.employee_password,
        })

        await savedEmployee.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message
                })
            } else {
                cb({
                    response: true,
                    responseData: savedEmployee
                })
            }
        })
    }


    async update(cb) {

        if (this.employee_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await EmployeeModel.employeeModel.findByIdAndUpdate(
            { _id: this.employee_id },
            this

            , (err, updatedEmployee) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedEmployee
                    })
                }
            })
    }

    

    async delete(cb) {
        await EmployeeModel.employeeModel.deleteOne({ _id: this.employee_id }, (err) => {
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

module.exports = Employee