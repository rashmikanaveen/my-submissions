const Note = require('../models/Note')

const createNote = async (request, response) => {
    const { content, important } = request.body
    if (!content) {
        return response.status(400).json({ error: 'content is required' })
    }
    const note = new Note({
        content,
        important: important || false
    })
    const savedNote = await note.save()
    return response.status(201).json(savedNote)
}

const getAllNotes = async (request, response) => {
    const notes = await Note.find({})
    return response.json(notes)
}


const getNoteById = async (request, response,next) => {
    const { id } = request.params
    const note = await Note.findById(id)
    if (!note) {
        return response.status(404).json({ error: 'note not found' })
    }
    return response.json(note)
}


const deleteNote = async (request, response) => {
    const id = request.params.id
    const deletedNote = await Note.findByIdAndDelete(id)

    if (!deletedNote) {
        return response.status(404).json({ error: 'note not found' })
    }
    return response.status(204).end()
}

const toggleImportant = async (request, response) => {
    const { id } = request.params
    const note = await Note.findById(id)
    if (!note) {
        return response.status(404).json({ error: 'note not found' })
    }
    note.important = !note.important
    const updatedNote = await note.save()
    return response.json(updatedNote)
}


module.exports = {
    getAllNotes,
    getNoteById,
    deleteNote,
    createNote,
    toggleImportant
}