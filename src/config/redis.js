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

module.exports = client
