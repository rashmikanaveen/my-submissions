import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import loginService from './services/login'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showImportant, setShowImportant] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService.create(noteObject)
      .then(returned => {
        setNotes(notes.concat(returned))
        setNewNote('')
      })
      .catch(error => {
        setErrorMessage(`Error: ${error.response?.data?.error || 'Failed to add note'}`)
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.toggleNote(id, changedNote)
      .then(returned => {
        setNotes(notes.map(n => n.id !== id ? n : returned))
      })
      .catch(error => {
        setErrorMessage(`Error: ${error.response?.data?.error || 'Failed to update note'}`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit" type="submit" className="px-3 py-1 bg-gray-150 border border-gray-400 rounded text-sm bg-gray-100 my-2">
        login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote} className="flex gap-2 mb-6">
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder="write a new note"
          className="border border-gray-400 px-2 py-1 text-sm rounded-sm"
        />
        <button type="submit" className="px-3 py-1 bg-gray-150 border border-gray-400 rounded text-sm bg-gray-100">
          save
        </button>
      </form>
  )

  const notesToShow = showImportant ? notes.filter(n => n.important) : notes

  return (
    <div className="p-6 max-w-3xl">
      <Notification message={errorMessage} />
      {/* Heading matches the green, serif, italic style in the image */}
      <h1 className="text-4xl font-serif italic text-green-700 mb-4">Notes</h1>

      {user === null ? loginForm() : (
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <p>{user.name} logged in</p>
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedNoteappUser')
              setUser(null)
              noteService.setToken(null)
            }}
            className="px-3 py-1 bg-gray-150 border border-gray-400 rounded text-sm bg-gray-100"
          >
            logout
          </button>
        </div>
        {noteForm()}
      </div>
    )}


      <button
        onClick={() => setShowImportant(!showImportant)}
        className="mb-4 px-2 py-1 bg-gray-100 border border-gray-400 rounded text-sm actual-btn"
      >
        {showImportant ? 'show all' : 'show important'}
      </button>

      {/* Restored standard padding and list-disc for proper bullet points */}
      <ul className="list-disc pl-8 mb-6 space-y-2">
        {notesToShow.map(note => (
          <li key={note.id} className="text-gray-900 alignment-fix">
            <span className="mr-2">{note.content}</span>
            <button
              onClick={() => toggleImportanceOf(note.id)}
              className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-400 rounded"
            >
              {note.important ? 'make not important' : 'make important'}
            </button>
          </li>
        ))}
      </ul>

      {/* Footer matching the green italic style */}
      <footer className="text-green-700 font-serif italic text-sm mt-8">
        Note app, Department of Computer Science, University of Helsinki 2023
      </footer>
    </div>
  )
}

export default App
