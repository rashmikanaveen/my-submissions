const personsRouter = require('express').Router()
const { createPerson } = require('../controllers/person')

personsRouter.post('/', createPerson)

module.exports = personsRouter
