const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: { type: Boolean, default: false },
})


const Note =  mongoose.models.Note || mongoose.model('Note', noteSchema)

module.exports = Note