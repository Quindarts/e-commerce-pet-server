const { default: mongoose, Schema } = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)
