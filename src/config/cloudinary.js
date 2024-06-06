const cloudinary = require('cloudinary').v2
const { appConfig } = require('./app')

cloudinary.config({
    cloud_name: appConfig.db_image.cloud_name,
    api_key: appConfig.db_image.api_key,
    api_secret: appConfig.db_image.api_secret,
})

module.exports = cloudinary
