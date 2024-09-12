import React from 'react';
import '../App.css'; 
import axios from 'axios'
//import personService from './services/persons'





const PersonsAndNames = (props) => {
  const persons = props.persons;

  const ShowPerson = ({ person }) => {
    return (
      <li>
        {person.name} {person.number} <button onClick={() => DeleteNameAndNumber(person.id)}>delete</button>
      </li>
    );
  };

  const DeleteNameAndNumber = (id) => {
    console.log(name + ' wants to be deleted');
    const url = `http://localhost:3001/persons/${id}`
    
    const changPersons=persons.filter(person => person.id !== id)
    axios.delete(url).then(console.log('deleted'))
    
  };

  

  return (
    <div>
      <p>{persons.length} results</p>
      <ul>
        {persons.map((person) => (
          <ShowPerson key={person.id} person={person}  />
        ))}
      </ul>
    </div>
  );
};

export default PersonsAndNames;