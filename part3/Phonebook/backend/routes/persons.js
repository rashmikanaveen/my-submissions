const personsRouter = require('express').Router()
const { createPerson,getAllPersons,deletePerson } = require('../controllers/person')

personsRouter.post('/', createPerson)
personsRouter.get('/',getAllPersons)
personsRouter.delete('/:id',deletePerson)


module.exports = personsRouter
