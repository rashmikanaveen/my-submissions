import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState("")
  const [filter, setFilter] = useState("")
  

  const changeName = (event) => {
    setNewName(event.target.value)
    
    

  }
  const changeNumber = (event) => {
    setNumber(event.target.value)
  }

  const addPerson= (event) => {
    event.preventDefault()
    console.log(persons)

    
    
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const personObject = {
        name: newName ,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      
      setNewName("")
      setNumber("")
    }
    const findPerson = (event) => {
      event.preventDefault()
      const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      setPersons(filteredPersons)
    }
    
    
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={findPerson}> 
        <div>
          filter shown with <input type="text"/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <form onSubmit={addPerson}>
      <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={changeName} placeholder='Enter the name' required/>
        </div>
        <div>number: <input value={newNumber} onChange={changeNumber} required type="tel" placeholder='Enter the number'/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
    <p key={index} style={{ margin: '0px ' }}>{person.name} {person.number}</p>
))}
     
    </div>
  )
}

export default App;