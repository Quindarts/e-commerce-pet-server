const mongoose = require('mongoose')

const orderDetailSchema = new mongoose.Schema({
    // Dựa vào cart_id -> lấy danh sach product_id để embedded Products vào orderDetail
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cart',
    },
    product_order: [
        {
            product: [productSchema],
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
})
module.exports = mongoose.model('order', orderDetailSchema)
