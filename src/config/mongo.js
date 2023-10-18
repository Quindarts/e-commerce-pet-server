const mongoose = require('mongoose')

async function connect() {
    // try {
    //     await mongoose.connect(appConfig.db.url, {
    //         useNewUrlParser: true,
    //     })

    //     console.log('🚀 ~~~ connected to Atlas::::Ecommerce-Pet ')
    // } catch (error) {
    //     console.log('Connect Failed Atlas!!')
    // }

    try {
        await mongoose.connect(`${process.env.BASE_URL_DB}`, {
            useNewUrlParser: true,
        })
        console.log('🚀 ~~~ connected to Mongo_compass::::Ecommerce-Pet ')
    } catch (error) {
        console.log('Connect Failed Mongo_compass!!')
    }
}
module.exports = { connect }
