import { useState,useEffect } from 'react'
//import PersonsAndNames   from './components/PersonsAndNames'
import Filter from './components/Filter'
import './App.css'; 
import personService from './services/persons'
import axios from 'axios'




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

  

const PersonsAndNames = (props) => {
  const persons = props.persons;
  

  

  const ShowPerson = ({ person }) => {
    return (
      <li >
        {person.name} {person.number} <button onClick={() => DeleteNameAndNumber(person.id,'Do you really want to delete this contact?')}>delete</button>
      </li>
    );
  };

  const DeleteNameAndNumber = (id,str) => {
    const userConfirm = window.confirm(str)
    
    if(userConfirm){
      
    //console.log(name + ' wants to be deleted');
    DeletePersonFromArray(id)
    
    }
    
    
  };



  

  return (
    <div>
      <p>{persons.length} results</p>
      <ul>
        {persons.map((person) => (
          <ShowPerson key={person.id} person={person}  />
        ))}
      </ul>
    </div>
  );
};

const DeletePersonFromArray=(id)=>{
  const url = `http://localhost:3001/persons/${id}`
    
    const changPersons=persons.filter(person => person.id !== id)
    axios.delete(url)
    
    .then(setPersons(changPersons))

}




  
  
  

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
    
    const personObject = {
      name: newName ,
      number: newNumber
    }
    const exist =persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    //console.log(newName,exist)
    
    
    if(exist){
      const existperson = persons.find(item => item.name === newName);
      const id = existperson ? existperson.id : null;
      
      const userConfirm = window.confirm(newName+ ' is alreaddy added to phonebook, replace the old number with a new one?')
    
      if(userConfirm){
        personService
        .update(id,personObject)
        .then(updateperson => {
          setPersons(persons.map(P => P.id !== id ? P : updateperson))
        })
        return
      
      
    
      
      
    
    
      }
      else{
        return
      }
      

    }
    
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        //console.log(persons)
      })
      console.log(persons)
    setNewName("")
    setNumber("")
    
    
  }
  
  
  
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter/>
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


