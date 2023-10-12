const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    cart_details: [
        {
            product: {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        },
    ],
    dateUpdate: {
        type: mongoose.Schema.Types.Date,
    },
})
module.exports = mongoose.model('Cart', cartSchema)
