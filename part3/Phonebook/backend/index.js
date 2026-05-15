const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})



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

const personsRouter = require('./routes/persons')
app.use('/api/persons', personsRouter)
