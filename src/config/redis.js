const redis = require('redis')
const dotenv = require('dotenv')
dotenv.config()

const client = redis.createClient({})

const handleEventRedisStatus = (status) => {
    client.on(status, () => {
        console.log(`> ${status} to Redis cache`)
    })
}

handleEventRedisStatus('connect')
handleEventRedisStatus('error')

// const getDataInRedisCache = async (name_data, dataType) => {
//     const data = await client.GET(name_data)
//     console.log('🚀 ~ getDataInRedisCache ~ data:', data)
// }
module.exports = client
