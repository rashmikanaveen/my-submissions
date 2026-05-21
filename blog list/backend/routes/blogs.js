const blogsRouter = require('express').Router()

const {getAll,addBlog,deleteBlog,updateBlogLike} = require('../controllers/blogs') 


blogsRouter.get('/', getAll)
blogsRouter.post('/', addBlog)
blogsRouter.delete('/:id', deleteBlog)
blogsRouter.put('/:id', updateBlogLike)

module.exports = blogsRouter