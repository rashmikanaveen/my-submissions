
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
  

    // find the person in the phonebook
  const changeFilter = (event) => {
    const inputValue = event.target.value;
    setFilter(inputValue)

    event.preventDefault()
    if(inputValue === ""){
      setfilterCountry([])
      console.log("empty")
    }
    else{
      const subfilterInLowerCase = inputValue.toLowerCase()
    
    setfilterCountry(countries.filter(country => country.name.common.toLowerCase().includes(subfilterInLowerCase)))
    }
    

    
  }
    
    return(
        <div> 
            
        <div>
  
          find countries <input type="text" placeholder='Ex:- enter a or A' value={filter} onChange={changeFilter}/>
          
        </div>
        
        <ShowFilterCountries filterdCountries={filterdCountries}/>
        
      </div>

    )

}
export default Filter;