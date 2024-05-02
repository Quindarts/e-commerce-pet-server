const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    address: ['addressSchema'],

    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
})

const Provider = mongoose.model('Provider', providerSchema) // map bảng 'Provider' với class Provider
module.exports = Provider
