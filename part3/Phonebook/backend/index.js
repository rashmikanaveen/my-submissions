const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// Create a custom token for morgan to log POST request body
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

// Use morgan with custom format to show POST data
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



let Phonebook  = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const currentTime = new Date()
  const count = Phonebook.length
  
  response.send(
    `<div>
      <p>Phonebook has info for ${count} people</p>
      <p>${currentTime}</p>
    </div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = Phonebook.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})


app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Phonebook = Phonebook.filter(note => note.id !== id)

  response.status(204).end()
})


app.get('/api/persons', (request, response) => {
    response.json(Phonebook)
})



const generateId = () => {
  const id = Math.floor(Math.random() * 100000000)
  return String(id)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name && body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  let nameExists = false
  Phonebook.forEach(person => {
    if (person.name === body.name) {
      nameExists = true
    }
  })

  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number ,
    
  }

  Phonebook = Phonebook.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})