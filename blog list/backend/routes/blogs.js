const blogsRouter = require('express').Router()

const {getAll,addBlog} = require('../controllers/blogs') 


blogsRouter.get('/', getAll)
blogsRouter.post('/', addBlog)

module.exports = blogsRouter