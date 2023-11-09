const cloudinary = require('cloudinary')
const CryptoJS = require('crypto-js')

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
//AES
function encryptedPassword(password) {
    return CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
    ).toString()
}

function decryptedPassword(decryptPassword) {
    return CryptoJS.AES.decrypt(
        decryptPassword,
        process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8)
}

module.exports = {
    uploadingImageCloudinary,
    encryptedPassword,
    decryptedPassword,
}
