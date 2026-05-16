const notesRouter = require('express').Router()

const {createNote,getAllNotes,getNoteById,deleteNote} = require('../controllers/notes') 

notesRouter.post('/', createNote)
notesRouter.get('/', getAllNotes)
notesRouter.get('/:id', getNoteById)
notesRouter.delete('/:id', deleteNote)

module.exports = notesRouter