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
            },
            public_id: {
                type: String,
            },
        },
    ],
    attribute_product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AttributeProduct',
            required: true,
        },
    ],
    total_attribute: {
        type: Number,
    },
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
    },
    isActive: {
        type: Boolean,
        default: true,
    },
})
module.exports = mongoose.model('Product', productSchema)
