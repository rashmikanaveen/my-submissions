const Blog = require('../models/blog')

const getAll = async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
}

const addBlog = async (request, response, next) => {
    const { title, author, url, likes,userId } = request.body
        if (!title || !url) {
            return response.status(400).json({ error: 'title and url are required' })
        }
        if (!userId) {
        return response.status(400).json({ error: 'userId is required' })
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


const deleteBlog = async (request, response, next) =>{
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
        {likes },
        { returnDocument: 'after' }
    )
    if (!updatedBlog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    response.json(updatedBlog)
}

module.exports = { getAll, addBlog ,deleteBlog,updateBlogLike}