const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        upperCase: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        index: true,
    },
    images: [
        {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
            },
        },
    ],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    avaiable: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    tags: {
        type: Array,
        lowercase: true,
    },
    brand: {
        type: String,
        lowercase: true,
        required: true,
        default: 'no brand',
    },
    dimensions: {
        length: Number,
        width: Number,
        weight: Number,
        height: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
})
module.exports = mongoose.model('Product', productSchema)
