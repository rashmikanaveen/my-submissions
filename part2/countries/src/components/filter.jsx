
import { useState,useEffect } from 'react'
import ShowFilterCountries from './ShowFilterCountries'

const Filter=({countries})=>{
    if (!Array.isArray(countries)) {
        //console.log('Countries is not an array or is undefined');
        return null;
      }
    

    //console.log(countries[0])
    
    
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
      console.log("empty")
    }
    else{
      const subfilterInLowerCase = filter.toLowerCase()
    
    setfilterCountry(countries.filter(country => country.name.common.toLowerCase().includes(subfilterInLowerCase)))
    }
    

    
  }
    
    return(
        <div> 
            
        <div>
  
          find countries <input type="text" placeholder='Ex:- enter a or A' value={filter} onChange={changeFilter}/>
          <button type="submit" onClick={findCountry}>Show</button>
        </div>
        
        <ShowFilterCountries filterdCountries={filterdCountries}/>
        
      </div>

    )

}
export default Filter;