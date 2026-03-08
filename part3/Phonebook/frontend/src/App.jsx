import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import './App.css';
import personService from './services/persons'

const Notification = ({ message, givencolor }) => {
  if (message === null || message === '') {
    return null
  }

  const colorClass = givencolor === 'red' ? 'text-red-600 border-red-400' : 'text-green-600 border-green-400'

  return (
    <div className={`${colorClass} bg-gray-100 text-lg border-2 rounded-md px-4 py-3 mb-4 font-medium`}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [errorColor, setColor] = useState('green')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const PersonsAndNames = (props) => {
    const persons = props.persons;

    const ShowPerson = ({ person }) => {
      return (
        <li className="flex items-center justify-between py-2 px-3 border-b border-gray-200 hover:bg-gray-50">
          <span className="text-gray-800">
            <span className="font-medium">{person.name}</span>
            <span className="text-gray-500 ml-3">{person.number}</span>
          </span>
          <button
            onClick={() => DeleteNameAndNumber(person.id, 'Do you really want to delete this contact?')}
            className="ml-4 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            delete
          </button>
        </li>
      );
    };

    const DeleteNameAndNumber = (id, str) => {
      const userConfirm = window.confirm(str)
      if (userConfirm) {
        DeletePersonFromArray(id)
      }
    };

    return (
      <div>
        <p className="text-sm text-gray-500 mb-2">{persons.length} results</p>
        <ul className="border border-gray-200 rounded-md divide-y divide-gray-100">
          {persons.map((person) => (
            <ShowPerson key={person.id} person={person} />
          ))}
        </ul>
      </div>
    );
  };

  const DeletePersonFromArray = (id) => {
    const changPersons = persons.filter(person => person.id !== id)
    personService.removename(id)
      .then(setPersons(changPersons))
  }

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    setNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const exist = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())

    if (exist) {
      const existperson = persons.find(item => item.name === newName);
      const id = existperson ? existperson.id : null;
      const userConfirm = window.confirm(newName + ' is alreaddy added to phonebook, replace the old number with a new one?')

      if (userConfirm) {
        personService
          .update(id, personObject)
          .then(updateperson => {
            setPersons(persons.map(P => P.id !== id ? P : updateperson))
          })
          .catch(error => {
            setErrorMessage(`infromation of ${newName} has already removed from server`)
            setColor('red')
            setTimeout(() => { setErrorMessage(null) }, 5000)
          })
        return
      } else {
        return
      }
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
      })

    setNewName("")
    setNumber("")
    setErrorMessage(`Added ${newName}`)
    setTimeout(() => { setErrorMessage(null) }, 5000)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      {/* Top Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Phonebook</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your contacts easily</p>
      </div>

      {/* Notification */}
      <div className="max-w-5xl mx-auto">
        <Notification message={errorMessage} givencolor={errorColor} />
      </div>

      {/* Two Column Layout */}
      <div className="max-w-5xl mx-auto flex gap-6 items-start">

        {/* LEFT SIDE - Filter */}
        <div className="w-64 shrink-0">
          <div className="bg-white shadow-md rounded-lg p-5 sticky top-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">🔍 Search</h2>
            <Filter />
          </div>
        </div>

        {/* RIGHT SIDE - Form + Contacts */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Add Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">➕ Add a new contact</h2>
            <form onSubmit={addPerson} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <input
                  value={newName}
                  onChange={changeName}
                  placeholder="Enter the name"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Number</label>
                <input
                  value={newNumber}
                  onChange={changeNumber}
                  required
                  type="tel"
                  placeholder="Enter the number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Add Contact
              </button>
            </form>
          </div>

          {/* Contacts List */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Contacts</h2>
            <PersonsAndNames persons={persons} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App;