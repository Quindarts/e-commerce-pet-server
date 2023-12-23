require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const mongoDB = require('./config/mongo')
const { appConfig } = require('./config/app')
const cors = require('cors')
const route = require('./routes')
const helper = require('./helper/index')
const { generateProductCode } = require('./helper/randomCode')

app.use(express.json())
mongoDB.connect()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(helmet())
app.use(cors(corsOptions))

route(app)

app.listen(appConfig.port, () =>
    console.log('> Server is up and running on port : ' + appConfig.port)
)
