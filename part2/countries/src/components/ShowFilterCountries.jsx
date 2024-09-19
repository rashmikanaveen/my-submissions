const CountryDetails=({country})=>{
  const imgSource=country.flags['png']
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
      </div>
    );

}

const ShowFilterCountries = ({ filterdCountries }) => {
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
           {country.name.common} <button onClick={() => CountryDetails(country)}>show</button>
         </div>
       ))}
     </div>
   );
  }

 
};

  export default ShowFilterCountries;