const notesRouter = require('express').Router()
const userExtractor = require('../utils/middleware/userExtractor')

const { createNote, getAllNotes, getNoteById, deleteNote, toggleImportant } = require('../controllers/notes')

notesRouter.post('/',userExtractor, createNote)
notesRouter.get('/', getAllNotes)
notesRouter.get('/:id', getNoteById)
notesRouter.delete('/:id', deleteNote)
notesRouter.put('/:id', toggleImportant)

module.exports = notesRouter