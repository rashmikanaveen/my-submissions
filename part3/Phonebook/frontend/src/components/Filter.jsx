import ShowFilterPersons from './ShowFilterPersons'
//import '../App.css'; 
import { useState,useEffect } from 'react'
import personService from '../services/persons'
const Filter=()=>{
    //const persons=props.persons
    const [persons, setPersons] = useState([])
    const [filterdPersons, setfilterPersons] = useState([])
    const [filter, setFilter] = useState("")
    useEffect(() => {
      personService
        .getAll()
        .then(response => {
          setPersons(response)
        })
    }, [])


    //change the filter name
  const changeFilter = (event) => {
    setFilter(event.target.value)
  }


    // find the person in the phonebook
  const findPerson = (event) => {
    event.preventDefault()
    if(filter === ""){
      setfilterPersons([])
    }
    else{
      const subfilterInLowerCase = filter.toLowerCase()
    
    setfilterPersons(persons.filter(person => person.name.toLowerCase().includes(subfilterInLowerCase)))
    }
    

    
  }
    
    return(
        <form onSubmit={findPerson} > 
        <div>
  
          filter shown with<br /> <input type="text" placeholder='Ex:- enter a or A' value={filter} onChange={changeFilter}/>
        </div>
        <div>
          <button type="submit">Show</button>
        </div>
        <ShowFilterPersons filterdPersons={filterdPersons}/>
        
      </form>

    )

}
export default Filter;