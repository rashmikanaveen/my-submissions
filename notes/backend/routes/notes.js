const notesRouter = require('express').Router()

const { createNote, getAllNotes, getNoteById, deleteNote, toggleImportant } = require('../controllers/notes')

notesRouter.post('/', createNote)
notesRouter.get('/', getAllNotes)
notesRouter.get('/:id', getNoteById)
notesRouter.delete('/:id', deleteNote)
notesRouter.put('/:id', toggleImportant)

module.exports = notesRouter