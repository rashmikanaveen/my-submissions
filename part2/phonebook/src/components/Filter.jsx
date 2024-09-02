import ShowFilterPersons from './ShowFilterPersons'
import '../App.css'; 
import { useState } from 'react'
const Filter=(props)=>{
    const persons=props.persons
    const filtPies=props.filtPies
    const [filterdPersons, setfilterPersons] = useState([])
    const [filter, setFilter] = useState("")
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
  
          filter shown with <input type="text" placeholder='Ex:- enter a or A' value={filter} onChange={changeFilter}/>
        </div>
        <div>
          <button type="submit">Show</button>
        </div>
        <ShowFilterPersons filterdPersons={filterdPersons}/>
        
      </form>

    )

}
export default Filter;