require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const mongoDB = require('./config/mongo')
const { appConfig } = require('./config/app')
const cors = require('cors')
const route = require('./routes')
const helper = require('./helper/index')

app.use(express.json())
mongoDB.connect()

const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
}

app.use(helmet())
app.use(cors(corsOptions))

route(app)

const jwt = require('jsonwebtoken')

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjU1OGVhYjZmNjJkY2RmZmFmNmM3N2VkIn0sImlhdCI6MTcwMDkyMjAxMiwiZXhwIjoxNzAwOTI1NjEyfQ.iOneqG_vYy9QovcR2HLSYryQROZxTLLt66jsHh_Q_As'



app.listen(appConfig.port, () =>
    console.log('> Server is up and running on port : ' + appConfig.port)
)
