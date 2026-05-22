const usersRouter = require('express').Router()

const  {createUser,getAllUsers}=require('../controllers/users')

usersRouter.post('/', createUser)
usersRouter.get('/', getAllUsers)

module.exports = usersRouter