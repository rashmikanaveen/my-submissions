const express = require('express')
const app = express()
const connectDB = require('./db')
const errorHandler = require('./middleware/errorHandler')
const notesRouter = require('./routes/notes')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)






const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}




app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


// handler of requests with unknown endpoint
app.use(unknownEndpoint)
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB()

    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()

