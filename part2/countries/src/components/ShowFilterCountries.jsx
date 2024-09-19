

  const ShowFilterCountries = ({ filterdCountries }) => {
  

    return (
      <div>
        {filterdCountries.map((country, index) => (
          <div key={index}>
            {country.name.common}
          </div>
        ))}
      </div>
    );
  };


  export default ShowFilterCountries;