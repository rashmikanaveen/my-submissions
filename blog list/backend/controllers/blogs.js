const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getAll = async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    return response.json(blogs)
}

const addBlog = async (request, response, next) => {
    const { title, author, url, likes } = request.body
    if (!title || !url) {
        return response.status(400).json({ error: 'title and url are required' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
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
        user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return response.status(201).json(savedBlog)
}


const deleteBlog = async (request, response, next) => {
    const id = request.params.id

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(400).json({ error: 'user not found' })
    }
    const deletedBlog = await Blog.findById(id)


    if (!deletedBlog) {
        return response.status(404).json({ error: 'Blog not found' })
    }
    if (deletedBlog.user.toString() !== user.id.toString()) {
        return response.status(403).json({ error: 'only the creator can delete the blog' })
    }
    //console.log('deleting blog with id:', id)
    await Blog.findByIdAndDelete(id)
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