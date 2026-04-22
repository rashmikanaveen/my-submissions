const mongoose = require('mongoose');

const PhonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', PhonebookSchema)

module.exports=Phonebook