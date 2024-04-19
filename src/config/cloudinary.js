const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name: 'dyd2nynrp',
    api_key: '329673611634987',
    api_secret: 'ub6udu92OhFMqWK3oa0brRiJu3s',
})

module.exports = cloudinary
