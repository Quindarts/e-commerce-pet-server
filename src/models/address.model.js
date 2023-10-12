const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    province: {
        provinceId: {
            type: Number,
            required: true,
        },
        provinceName: {
            type: String,
            required: true,
        },
    },
    district: {
        districtId: {
            type: Number,
        },
        districtName: {
            type: String,
            required: true,
        },
    },
    ward: {
        wardId: {
            type: String,
            upperCase: true,
            required: true,
        },
        wardName: {
            type: String,
            required: true,
        },
    },
    detail: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        upperCase: true,
        required: true,
        unique: true,
    },
    country: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.Schema('Address', addressSchema)
