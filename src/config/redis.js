const redis = require('redis')
const dotenv = require('dotenv')

dotenv.config()

const REDIS_CONFIG = {
    url: process.env.KV_URL,
    socket: {
        tls: true,
    },
}
const client = redis.createClient(REDIS_CONFIG)

const handleEventRedisStatus = (status) => {
    client.on(status, () => {
        console.log(`> ${status} to Redis cache`)
    })
}

handleEventRedisStatus('connect')
handleEventRedisStatus('error')

module.exports = client
