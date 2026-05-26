const usersRouter = require('express').Router()
const userExtractor = require('../utils/middleware/userExtractor')

const  {createUser,getAllUsers}=require('../controllers/users')

usersRouter.post('/', createUser)
usersRouter.get('/',userExtractor, getAllUsers)

module.exports = usersRouter