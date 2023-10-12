const cloudinary = require('cloudinary')
const appConfig = require('../config/app')

async function uploadingImageCloudinary(path, public_id) {

    cloudinary.config({
        cloud_name: process.env.CLOUD_IMAGE_NAME,
        api_key: process.env.CLOUD_IMAGE_API_KEY,
        api_secret: process.env.CLOUD_IMAGE_API_SECRET,
    })
    const resultUpload = await cloudinary.v2.uploader.upload(
        path,
        { public_id: public_id },
        function (error, result) {
            console.log('Upload done in cloudinary')
        }
    )
    return resultUpload
}
module.exports = { uploadingImageCloudinary }
