
import { useState,useEffect } from 'react'
import ShowFilterCountries from './ShowFilterCountries'

const filter=({countries})=>{
    console.log("ok")
    //const persons=props.persons
    
    const [filterdCountries, setfilterCountry] = useState([])
    const [filter, setFilter] = useState("")
    


    //change the filter name
  const changeFilter = (event) => {
    setFilter(event.target.value)
  }


    // find the person in the phonebook
  const findCountry = (event) => {
    event.preventDefault()
    if(filter === ""){
      setfilterCountry([])
    }
    else{
      const subfilterInLowerCase = filter.toLowerCase()
    
    setfilterCountry(countries.filter(person => person.name.toLowerCase().includes(subfilterInLowerCase)))
    }
    

    
  }
    
    return(
        <div> 
        <div>
  
          find countries<br /> <input type="text" placeholder='Ex:- enter a or A' value={filter} onChange={changeFilter}/>
          <button type="submit" onClick={findCountry}>Show</button>
        </div>
        
        <ShowFilterCountries filterdPersons={filterdCountries}/>
        
      </div>

    )

}
export default filter;