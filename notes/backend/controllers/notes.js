const Note = require('../models/Note')
const User = require('../models/user')

const createNote = async (request, response) => {
    const { content, important, userId } = request.body

    if (!content) {
        return response.status(400).json({ error: 'content is required' })
    }
    if (!userId) {
        return response.status(400).json({ error: 'userId is required' })
    }
    const user = await User.findById(userId)

    if (!user) {
        return response.status(400).json({ error: 'user not found' })
    }

    const note = new Note({
        content,
        important: important || false,
        user: user.id
    })
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    return response.status(201).json(savedNote)
}

const getAllNotes = async (request, response) => {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
    return response.json(notes)
}


const getNoteById = async (request, response, next) => {
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