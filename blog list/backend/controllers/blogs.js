const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const extractToken = require('../utils/extractToken')

const getAll = async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
}

const addBlog = async (request, response, next) => {
    const { title, author, url, likes, userId } = request.body
    if (!title || !url) {
        return response.status(400).json({ error: 'title and url are required' })
    }
    if (!userId) {
        return response.status(400).json({ error: 'userId is required' })
    }
     const decodedToken = jwt.verify(extractToken(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(400).json({ error: 'user not found' })
    }
    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: userId
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return response.status(201).json(savedBlog)
}


const deleteBlog = async (request, response, next) => {
    const id = request.params.id
    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
        return response.status(404).json({ error: 'Blog not found' })
    }
    return response.status(204).end()
}

const updateBlogLike = async (request, response, next) => {
    const id = request.params.id
    const { likes } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { likes },
        { returnDocument: 'after' }
    )
    if (!updatedBlog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    response.json(updatedBlog)
}

module.exports = { getAll, addBlog, deleteBlog, updateBlogLike }