const cloudinary = require('../config/cloudinary')
const { HTTP_STATUS } = require('../utils/constant')

const uploadSingleImage = async (req, res, next) => {
    cloudinary.uploader.upload(req.body.path, async function (err, result) {
        if (err) {
            console.log('🚀 ~ err:', err)
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: 'Upload failed, try again..',
            })
        }   
        ;(req.body.images = {
            url: result.url,
            id: result.public_id,
        }),
            next()
    })
}

module.exports = {
    uploadSingleImage,
}
