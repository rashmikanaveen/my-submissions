const Note = require('../models/Note')

const createNote = async (request, response, next) => {
    try {
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
    } catch (error) {
        return next(error)
    }
}

const getAllNotes = async (request, response, next) => {
    try {
        const notes = await Note.find({})
        return response.json(notes)
    } catch (error) {
        return next(error)
    }
}


const getNoteById = async (request, response, next) => {
    try {
        const { id } = request.params
        const note = await Note.findById(id)
        if (!note) {
            return response.status(404).json({ error: 'note not found' })
        }
        return response.json(note)
    }
    catch (error) {
        return next(error)
    }
}


const deleteNote = async (request, response, next) => {
    try {
        const id = request.params.id
        const deletedNote = await Note.findByIdAndDelete(id)

        if (!deletedNote) {
            return response.status(404).json({ error: 'note not found' })
        }
        return response.status(204).end()
    }
    catch (error) {
        return next(error)
    }
}



module.exports = {
    getAllNotes,
    getNoteById,
    deleteNote,
    createNote
}