require('dotenv').config()

const appConfig = {
    port: process.env.PORT || 3000,
    clientURL: process.env.CLIENT_URL || 'http://localhost:3000',

    db: {
        userName: process.env.CLOUD_DB_USERNAME,
        password: process.env.CLOUD_DB_PASSWORD,
        url: `mongodb+srv://${process.env.CLOUD_DB_USERNAME}:${process.env.CLOUD_DB_PASSWORD}@cluster0.shu3wma.mongodb.net/?retryWrites=true&w=majority`,
    },
    db_image: {
        cloud_name: process.env.CLOUD_IMAMGE_NAME,
        api_key: process.env.CLOUD_IMAGE_API_KEY,
        api_secret: process.env.CLOUD_IMAGE_API_SECRET,
    },
}

module.exports = { appConfig }
