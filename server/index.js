import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import dbConnection from './db/dbConnection.js'

import registerRouter from './routes/registerUser.js'
import loginRouter from './routes/loginUser.js'
//TODO: написать роут поиска

//TODO: написать проверку статуса пользователя

import createCollectionRouter from './routes/userRoutes/createCollection.js'

import checkRights from './middlewares/checkRights.js'

import deleteRouter from './routes/adminRoutes/deleteUser.js'
import changeRoleRouter from './routes/adminRoutes/changeRole.js'


dotenv.config()

const server = express()

const PORT = process.env.PORT || 3000

server.use(cors())
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(express.json())

dbConnection()

server.use(registerRouter)
server.use(loginRouter)


server.use(createCollectionRouter)

server.use(checkRights)
server.use(deleteRouter)
server.use(changeRoleRouter)


server.listen(PORT, () => {
    console.log(`server started at ${PORT} port`)
})