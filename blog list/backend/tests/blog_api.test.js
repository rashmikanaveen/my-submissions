const { test, before, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const connectDB = require('../db')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')




before(async () => {
    await connectDB()
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

const api = supertest(app)

describe("Blog list api tests", () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs ')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('blog posts use id instead of _id', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            assert(blog.id)
            assert.strictEqual(blog._id, undefined)
        })
    })

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'Software Reliability',
            author: 'Leslie Lamport',
            url: 'https://example.com/software-reliability',
            likes: 1,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(n => n.title)

        assert(titles.includes(newBlog.title))
    })

    test('if likes is missing, it defaults to 0', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Test Author',
            url: 'https://example.com/test-blog'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })

    test('blog without title or url not added', async () => {
        const newBlogWithotTitle={
            author: 'Leslie Lamport',
            url: 'https://example.com/software-reliability',
            likes: 1,
        }
        const newBlogWithoutUrl={
           title: 'Test blog',
            author: 'Test Author',
            likes:23,
        }
        await api
            .post('/api/blogs')
            .send(newBlogWithotTitle)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

        await api
            .post('/api/blogs')
            .send(newBlogWithoutUrl)
            .expect(400)
        
        const blogsAtEnd2 = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd2.length, helper.initialBlogs.length)
    })
        


})
after(async () => {
    await mongoose.connection.close()
})