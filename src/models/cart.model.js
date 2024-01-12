const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        cart_details: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                options: [
                    {
                        stock: Number,
                        weight: Number,
                        price: {
                            type: Number,
                            required: true,
                            min: 0,
                        },
                    },
                ],
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        dateUpdate: {
            type: mongoose.Schema.Types.Date,
            default: Date.now,
        },
    },
    { _id: false }
)
module.exports = mongoose.model('Cart', cartSchema)
