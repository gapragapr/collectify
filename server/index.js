import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import dbConnection from './db/dbConnection.js'

import registerRouter from './routes/registerUser.js'
import deleteRouter from './routes/deleteUser.js'

dotenv.config()

const server = express()

const PORT = process.env.PORT || 3000

server.use(cors())
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(express.json())

dbConnection()

server.use(registerRouter)

server.use(deleteRouter)


server.listen(PORT, () => {
    console.log(`server started at ${PORT} port`)
})