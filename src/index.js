require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const mongoDB = require('./config/mongo')
const { appConfig } = require('./config/app')
app.use(helmet())
app.use(express.json())
mongoDB.connect()

app.listen(appConfig.port, () =>
    console.log('> Server is up and running on port : ' + appConfig.port)
)
