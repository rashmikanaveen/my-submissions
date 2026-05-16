const mongoose = require('mongoose');

const PhonebookSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  number: {
    type: String,
    required: true,
    minLength: 10,
    validate: {
      validator: function (value) {
        return value.startsWith('0')
      },
      message: 'number must start with 0'
    }
  }
})

const Phonebook = mongoose.model('Phonebook', PhonebookSchema)

module.exports = Phonebook