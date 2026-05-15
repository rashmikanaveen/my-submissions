//import '../App.css'; 
import { useState, useEffect } from 'react'
import personService from '../services/persons'
const Filter = ({ persons = [], onFilter }) => {
  const [filter, setFilter] = useState("")


  //change the filter name
  const changeFilter = (event) => {
    setFilter(event.target.value)
  }


  // find the person in the phonebook
  const findPerson = (event) => {
    event.preventDefault()
    const subfilterInLowerCase = filter.toLowerCase()

    const result = subfilterInLowerCase
      ? persons.filter(p => p.name.toLowerCase().includes(subfilterInLowerCase))
      : persons
    if (onFilter) onFilter(result)




  }

  return (
    <form onSubmit={findPerson} >
      <div>

        filter shown with<br />
        <input
          type="text"
          placeholder='Ex:- enter a or A'
          value={filter} onChange={changeFilter} />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
        >Show</button>
      </div>
    </form>

  )

}
export default Filter;