require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const mongoDB = require('./config/mongo')
const { appConfig } = require('./config/app')
const cors = require('cors')
const route = require('./routes')
const jwt = require('./helper/jwt.helper')
app.use(express.json())
mongoDB.connect()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(helmet())
app.use(cors(corsOptions))

console.log(
    '🚀 ~ jwt.generatePasswordTimer:',
    jwt.generatePasswordTimer('123123aad')
)
console.log(
    jwt.verifyTokenPasswordTimer(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMTIzMTIzYWFkIiwiaWF0IjoxNzE0MTkxMjY3LCJleHAiOjE3MTQxOTE1Njd9.1A3L3GsMq4KGVjiiJwksdjHewn55ouWoBgk8rJuhkNg'
    )
)
route(app)

app.listen(appConfig.port, () =>
    console.log('> Server is up and running on port : ' + appConfig.port)
)
