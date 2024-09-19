import { useState, useEffect } from 'react'
import axios from 'axios'

import filter from './components/filter.jsx';



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
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  
  const [country, setCountry] = useState({})

  


  
  useEffect(() => {
    console.log('effect run, country is now', country)

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

  const OnSearch = () => {
    
    filter(countries)
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      

      <OnSearch/>
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      <hr />
      <ShowCountries countries={countries} />
      
      
    </div>
  )
}

export default App
