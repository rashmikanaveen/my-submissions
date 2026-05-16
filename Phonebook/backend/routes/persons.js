const personsRouter = require('express').Router()
const { createPerson,getAllPersons,deletePerson,updatePerson,getUserById } = require('../controllers/person')

personsRouter.post('/', createPerson)
personsRouter.get('/',getAllPersons)
personsRouter.delete('/:id',deletePerson)
personsRouter.put('/:id',updatePerson)
personsRouter.get('/:id',getUserById)



module.exports = personsRouter
