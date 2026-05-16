import { useState, useEffect } from 'react'
import noteService from './services/notes'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showImportant, setShowImportant] = useState(false)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService.create(noteObject).then(returned => {
      setNotes(notes.concat(returned))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n._id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.toggleNote(id, changedNote)
      .then(returned => {
        setNotes(notes.map(n => n._id !== id ? n : returned))
      })
      .catch(() => {
        alert('The note was already removed from server')
        setNotes(notes.filter(n => n._id !== id))
      })
  }

  const notesToShow = showImportant ? notes.filter(n => n.important) : notes

  return (
    <div className="p-6 max-w-3xl">
      {/* Heading matches the green, serif, italic style in the image */}
      <h1 className="text-4xl font-serif italic text-green-700 mb-4">Notes</h1>

      <button
        onClick={() => setShowImportant(!showImportant)}
        className="mb-4 px-2 py-1 bg-gray-100 border border-gray-400 rounded text-sm actual-btn"
      >
        {showImportant ? 'show all' : 'show important'}
      </button>

      {/* Restored standard padding and list-disc for proper bullet points */}
      <ul className="list-disc pl-8 mb-6 space-y-2">
        {notesToShow.map(note => (
          <li key={note._id} className="text-gray-900 alignment-fix">
            <span className="mr-2">{note.content}</span>
            <button
              onClick={() => toggleImportanceOf(note._id)}
              className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-400 rounded"
            >
              {note.important ? 'make not important' : 'make important'}
            </button>
          </li>
        ))}
      </ul>

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

      {/* Footer matching the green italic style */}
      <footer className="text-green-700 font-serif italic text-sm mt-8">
        Note app, Department of Computer Science, University of Helsinki 2023
      </footer>
    </div>
  )
}

export default App
