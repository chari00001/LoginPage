// express.Router()

const helmet = require('helmet')
const express = require('express')
const app = express()

app.use(helmet())
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public'))

const router = require('./theRouter')
const userRouter = require('./userRouter')
app.use('/', router)
app.use('/user', userRouter)

app.listen(3000)