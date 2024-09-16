import { useState, useEffect } from 'react'
import axios from 'axios'




const ShowCountries = ({ countries }) => {
  if (!Array.isArray(countries)) {
    return null; // Ensure countries is an array
  }

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
  console.log('hello')



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

  if(country=== null){
    return null
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange} />
        <button type="submit"></button>
      </form>
      <ShowCountries countries={countries}/>
      
    </div>
  )
}

export default App
