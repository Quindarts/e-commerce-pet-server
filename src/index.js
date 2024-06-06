require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const { appConfig } = require('./config/app')
const cors = require('cors')
const route = require('./routes')
const mongoDB = require('./config/mongo')
const redis = require('./config/redis')

mongoDB.connect()

redis.connect((error) => {
    if (error) {
        console.error(error)
    }
})

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())

route(app)

app.listen(appConfig.port, () =>
    console.log('> Server is up and running on port : ' + appConfig.port)
)
