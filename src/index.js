require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const mongoDB = require('./config/mongo')
const { appConfig } = require('./config/app')
const cors = require('cors')
const route = require('./routes')

mongoDB.connect()
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(express.json())
app.use(helmet())
app.use(cors(corsOptions))

route(app)

app.listen(appConfig.port, () =>
    console.log('> Server is up and running on port : ' + appConfig.port)
)
