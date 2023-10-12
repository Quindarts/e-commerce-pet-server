const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
    },
    total: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
})
module.exports = mongoose.model('Category', categorySchema)
