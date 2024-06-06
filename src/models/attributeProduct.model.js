const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const attributeProduct = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        uppercase: true,
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
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
})

module.exports = mongoose.model('AttributeProduct', attributeProduct)
