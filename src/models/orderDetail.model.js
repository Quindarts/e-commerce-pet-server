const mongoose = require('mongoose')
const orderDetailSchema = new mongoose.Schema({
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cart',
    },
    product_order: [
        {
            product: {},
            attributeProduct: {},
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
})
module.exports = mongoose.model('OrderDetail', orderDetailSchema)
