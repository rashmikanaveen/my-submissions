import { useState } from 'react'
import PersonsAndNames   from './components/PersonsAndNames'
import Filter from './components/Filter'
import './App.css'; 



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState("")
  
  

  const changeName = (event) => {
    //change the name
    setNewName(event.target.value)
    
    

  }
  const changeNumber = (event) => {
    //change the number
    setNumber(event.target.value)
  }
  
  // add the person to the phonebook if the name is not already in the phonebook
  const addPerson= (event) => {
    event.preventDefault()
    console.log(persons)

    
    
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
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
    
    
  }
  
  
  
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons}/>
      <form onSubmit={addPerson}>
      <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={changeName} placeholder='Enter the name' required/>
        </div>
        <div>number: <input value={newNumber} onChange={changeNumber} required type="tel" placeholder='Enter the number'/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonsAndNames persons={persons}/>
     
    </div>
  )
}

export default App;


