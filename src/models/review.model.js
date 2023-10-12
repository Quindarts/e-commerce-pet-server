const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    dateCreated: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    },
    review_images: [
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
})
module.exports = mongoose.model('Review', reviewSchema)
