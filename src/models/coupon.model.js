const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
    },
    startDate: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
        required: true,
    },
    endDate: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    available: {
        type: Number,
        required: true,
        default: 1,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
})
module.exports = mongoose.model('Coupon', couponSchema)
