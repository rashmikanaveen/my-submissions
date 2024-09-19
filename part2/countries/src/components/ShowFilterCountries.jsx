const ShowFilterCountries = (props) => {
    const filterdPersons = props.filterdPersons
    return(
      <div>
        <p>{filterdPersons.length} results</p>
        {filterdPersons.map((person, index) => (
        <p key={index} style={{ margin: '0px ' }}>{person.name} {person.number}</p>
  ))}
      </div>
  
    )
  }

  export default ShowFilterCountries;