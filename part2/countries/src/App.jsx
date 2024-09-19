import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/filter.jsx';



const ShowCountries = ({ countries }) => {
  

  return (
    <div>
      {countries.map((country, index) => (
        <div key={index}>
          {country.name.common}
        </div>
      ))}
    </div>
  );
};

const App=()=> {
  
  const [countries, setCountries] = useState([])
  
  

  


  
  useEffect(() => {
    

    console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
          //setCountries(response.data.name.common)
        })
  }, [])
  

  if(countries=== null){
    console.log("No country found")
    return null
  }

  

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      

      <Filter countries={countries} />
      
      
      
    </div>
  )
}

export default App
