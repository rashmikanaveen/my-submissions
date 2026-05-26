const express = require('express')
const errorHandler = require('./utils/middleware/errorHandler')
const unknownEndpoint = require('./utils/middleware/unknownEndpoint')
const cors = require('cors')
const blogsRouter = require('./routes/blogs')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/logIn')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



// handler of requests with unknown endpoint
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app