import '../App.css'; 
const PersonsAndNames=(props)=>{
    const persons=props.persons
    return(
      <div>
        {persons.map((person, index) => (
    <p key={index} style={{ margin: '0px ' }}>{person.name} {person.number}</p>
  ))}
        
      </div>
    )
  }

export default PersonsAndNames;