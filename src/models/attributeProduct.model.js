const mongoose = require('mongoose')

const attributeProduct = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    avaiable: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('AttributeProduct', attributeProduct)
