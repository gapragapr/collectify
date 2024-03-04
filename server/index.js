import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import dbConnection from './db/dbConnection.js'

import registerRouter from './routes/registerUser.js'
import loginRouter from './routes/loginUser.js'
import getUserRouter from './routes/get/getUser.js'
//TODO: написать роут поиска

import createCollectionRouter from './routes/userRoutes/create/createCollection.js'
import createCollectionItemRouter from './routes/userRoutes/create/createCollectionItem.js'
import deleteCollectionRouter from './routes/userRoutes/delete/deleteCollection.js'
import deleteCollectionItemRouter from './routes/userRoutes/delete/deleteCollectionItem.js'
import commentCollectionRouter from './routes/userRoutes/actions/commentCollection.js'
import likeCollectionRouter from './routes/userRoutes/actions/likeCollection.js'

import checkAdminRights from './middlewares/checkAdminRights.js'
import checkCollectionEditRigths from './middlewares/checkCollectionEditRights.js'
import checkUserStatus from './middlewares/checkUserStatus.js'

import deleteUserRouter from './routes/adminRoutes/delete/deleteUser.js'
import changeUserParamsRouter from './routes/adminRoutes/change/changeUserParams.js'


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

server.use(getUserRouter)

server.use(checkUserStatus)
server.use(createCollectionRouter)
server.use(commentCollectionRouter)
server.use(likeCollectionRouter)

server.use(checkCollectionEditRigths)
server.use(createCollectionItemRouter)
server.use(deleteCollectionRouter)
server.use(deleteCollectionItemRouter)

server.use(checkAdminRights)
server.use(deleteUserRouter)
server.use(changeUserParamsRouter)



server.listen(PORT, () => {
    console.log(`server started at ${PORT} port`)
})