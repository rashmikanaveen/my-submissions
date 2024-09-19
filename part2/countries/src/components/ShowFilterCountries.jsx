import { useState,useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const CountryDetails=({country})=>{
  const [wetherOfCapital,setwetherOfCountry]=useState(null)
  

  
 
  useEffect(() => {
    if (country && country.capital) {
      axios.get(`${baseUrl}${country.capital}&appid=${api_key}`)
      .then(response => setwetherOfCountry(response.data))
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, []);
  if(wetherOfCapital===null){
    return
  }



  console.log(wetherOfCapital)
  const imgSource=country.flags['png']
  const weatherIcon = wetherOfCapital && wetherOfCapital.weather && wetherOfCapital.weather[0] && wetherOfCapital.weather[0].icon;
  const wether_img_sourse = weatherIcon ? `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` : '';
  
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>
          capital {country.capital} <br />
          area {country.area}
        </div>
        <div>
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages).map((language, index) => (<li key={index}>{language}</li>))}
         
           
          </ul>
          <img src={imgSource} alt="" />

         
       
       
        </div>


        <div>
          <h2>Wether in {country.capital}</h2>
          <div>temperature {wetherOfCapital.main.temp} Celcius</div>
          <img src={wether_img_sourse} alt="" />
        </div>

      </div>
    );

}


const ShowFilterCountries = ({ filterdCountries }) => {
  const [countriesToShow, setcountriesToShow] = useState(null);
  //const [countryToShow, setCountryToShow] = useState('');
  console.log(api_key)
  

  
  const ShowCountry=()=>{
    
    if(countriesToShow !==null){
      //console.log(countriesToShow)
      
      return(
        <div>
        <CountryDetails country={countriesToShow}/>
        
        </div>
      )
      

    }
      

    


  
  }
  const SetEmpty=()=>{
    setcountriesToShow([])
  }
  if(filterdCountries.length > 0){
  

  if(filterdCountries.length > 10){
   return <div>Too many matches, specify another filter</div>
  }
  else if(filterdCountries.length === 1){
    const country=filterdCountries[0]
    
    return (
      <div>
        <CountryDetails country={country}/>
      </div>
    );
    

  }
  else{
   return (
     <div>
       {filterdCountries.map((country, index) => (
         <div key={index}>
           {country.name.common} <button onClick={() => setcountriesToShow(country)}>show</button>
         </div>
       ))}
       <ShowCountry/>
       
     </div>

   );
  }
}
 
};

  export default ShowFilterCountries;