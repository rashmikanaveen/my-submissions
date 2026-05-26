const Blog = require('../models/blog')

const initialBlogs = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
        },
        {
            title: 'Canonical Forms in Computation',
            author: 'Grace Hopper',
            url: 'https://example.com/canonical-forms',
            likes: 4,
        },
        {
            title: 'Lambda Calculus Notes',
            author: 'Alonzo Church',
            url: 'https://example.com/lambda-calculus',
            likes: 7,
        },
        {
            title: 'Structured Programming',
            author: 'Niklaus Wirth',
            url: 'https://example.com/structured-programming',
            likes: 9,
        },
        {
            title: 'The Art of Computer Programming',
            author: 'Donald Knuth',
            url: 'https://example.com/taocp',
            likes: 8,
        },
        {
            title: 'Compilers and Interpreters',
            author: 'Adele Goldberg',
            url: 'https://example.com/compilers-and-interpreters',
            likes: 12,
        },
        {
            title: 'Debugging Deeply',
            author: 'Barbara Liskov',
            url: 'https://example.com/debugging-deeply',
            likes: 2,
        },
        {
            title: 'Systems Design Basics',
            author: 'Leslie Lamport',
            url: 'https://example.com/systems-design-basics',
            likes: 3,
        },
        {
            title: 'Concurrency Patterns',
            author: 'Edsger W. Dijkstra',
            url: 'https://example.com/concurrency-patterns',
            likes: 6,
        },
    ]

const users=[
    {
        username: 'testuser1',
        name: 'Test User 1',
        password: 'password1'
    },
    {
        username: 'testuser2',
        name: 'Test User 2',
        password: 'password2'
    }
]

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}