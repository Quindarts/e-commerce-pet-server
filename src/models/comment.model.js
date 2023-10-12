const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
        required: true,
    },
})
module.exports = mongoose.Schema('Comment', commentSchema)
