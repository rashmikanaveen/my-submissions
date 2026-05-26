const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware/userExtractor')

const {getAll,addBlog,deleteBlog,updateBlogLike} = require('../controllers/blogs') 


blogsRouter.get('/', getAll)
blogsRouter.post('/',userExtractor, addBlog)
blogsRouter.delete('/:id',userExtractor, deleteBlog)
blogsRouter.put('/:id', updateBlogLike)

module.exports = blogsRouter