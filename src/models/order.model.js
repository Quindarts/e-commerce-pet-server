const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    code: {
        type: String,
        uppercase: true,
        required: true,
        unique: true,
    },
    orderDetails: [
        {
            product: {},
            attributeProduct: {},
            _id: false,
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    countOrderItem: {
        type: mongoose.Schema.Types.Number,
        default: 1,
    },
    totalOrderItem: {
        type: mongoose.Schema.Types.Number,
        default: 0,
    },
    dateCreated: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now,
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
    },
    status: {
        type: String,
        enum: ['unpaid', 'paid', 'processing', 'cancel', 'express', 'complete'],
        lowercase: true,
        required: true,
        default: 'unpaid',
    },
    shippingStatus: {
        type: String,
        enum: ['packaged', 'delivery', 'delivered'],
        lowercase: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shipping_detail: {
        fullName: {
            type: String,
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
        },
    },
})
module.exports = mongoose.model('Order', orderSchema)
