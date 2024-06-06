const { default: mongoose, Schema } = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    isValid: {
        type: Boolean,
        default: true,
    },
    blackList: [
        {
            token: String,
        },
    ],
    signatureRefreshToken: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)
