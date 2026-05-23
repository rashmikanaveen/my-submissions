const loginRouter  = require('express').Router()

const  {logIn} = require('../controllers/login')

loginRouter .post('/', logIn)


module.exports = loginRouter