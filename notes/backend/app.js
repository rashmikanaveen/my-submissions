const express = require('express')
const errorHandler = require('./utils/middleware/errorHandler')
const unknownEndpoint = require('./utils/middleware/unknownEndpoint')
const notesRouter = require('./routes/notes')
const usersRouter = require('./routes/users')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)



// handler of requests with unknown endpoint
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app