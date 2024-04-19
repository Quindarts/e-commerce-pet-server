const cloudinary = require('../config/cloudinary')

const uploadSingleImage = async (req, res, next) => {
    cloudinary.uploader.upload(req.body.path, async function (err, result) {

        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Error',
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
