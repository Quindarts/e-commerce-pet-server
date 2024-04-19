const express = require('express')

const router = express.Router()
const cloudinary = require('../config/cloudinary')
const upload = require('../config/multer')

router.post('/', function (req, res) {
    cloudinary.uploader.upload(
        'C:Users\\admin\\AppData\\Local\\Temp\\iuh_slide.jpg',
        function (err, result) {
            // console.log('🚀 ~ req.file.path:', req.file.path)
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: 'Error',
                })
            }
            return res.status(200).json({
                success: true,
                message: 'Uploaded!',
                data: {
                    url: result.url,
                    id: result.public_id,
                },
            })
        }
    )
})
module.exports = router
