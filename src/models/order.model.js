const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    code: {
        type: String,
        uppercase: true,
        required: true,
        unique: true,
    },
    orderDetails: [orderDetailSchema],
    dateCreated: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now,
    },
    coupon: [couponSchema],
    status: {
        type: String,
        enum: [
            'unpaid',
            'paid',
            'processing',
            'packaged',
            'delivery',
            'delivered',
            'cancel',
        ],
        lowercase: true,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shipping_detail: {
        fullName: {
            type: String,
            required: true,
        },
        address: ['addressSchema'],
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
})
module.exports = mongoose.model('Order', orderSchema)
