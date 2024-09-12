import { useState,useEffect } from 'react'
import PersonsAndNames   from './components/PersonsAndNames'
import Filter from './components/Filter'
import './App.css'; 
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])



  
  
  

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
      
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
      })
      
      
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
          name <br /><input value={newName} onChange={changeName} placeholder='Enter the name' required/>
        </div>
        
        <div>number<br /> <input value={newNumber} onChange={changeNumber} required type="tel" placeholder='Enter the number'/></div>
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


