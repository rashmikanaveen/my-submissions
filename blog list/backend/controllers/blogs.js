const Blog = require('../models/blog')

const getAll = async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
}

const addBlog = async (request, response, next) => {
    const { title, author, url, likes } = request.body
        if (!title || !url) {
            return response.status(400).json({ error: 'title and url are required' })
        }
        const blog = new Blog({
            title,
            author,
            url,
            likes: likes || 0
        })
        const savedBlog = await blog.save()
        return response.status(201).json(savedBlog)
}

module.exports = { getAll, addBlog }