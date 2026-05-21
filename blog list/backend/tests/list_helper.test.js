const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
    const zeroBlogs = []


    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]
    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Canonical Forms in Computation',
            author: 'Grace Hopper',
            url: 'https://example.com/canonical-forms',
            likes: 4,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fa',
            title: 'Lambda Calculus Notes',
            author: 'Alonzo Church',
            url: 'https://example.com/lambda-calculus',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fb',
            title: 'Structured Programming',
            author: 'Niklaus Wirth',
            url: 'https://example.com/structured-programming',
            likes: 9,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fc',
            title: 'The Art of Computer Programming',
            author: 'Donald Knuth',
            url: 'https://example.com/taocp',
            likes: 8,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fd',
            title: 'Compilers and Interpreters',
            author: 'Adele Goldberg',
            url: 'https://example.com/compilers-and-interpreters',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fe',
            title: 'Debugging Deeply',
            author: 'Barbara Liskov',
            url: 'https://example.com/debugging-deeply',
            likes: 2,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17ff',
            title: 'Systems Design Basics',
            author: 'Leslie Lamport',
            url: 'https://example.com/systems-design-basics',
            likes: 3,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1800',
            title: 'Concurrency Patterns',
            author: 'Edsger W. Dijkstra',
            url: 'https://example.com/concurrency-patterns',
            likes: 6,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1801',
            title: 'Software Reliability',
            author: 'Leslie Lamport',
            url: 'https://example.com/software-reliability',
            likes: 1,
            __v: 0
        }


    ]
    const mosBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Canonical Forms in Computation',
            author: 'Grace Hopper',
            url: 'https://example.com/canonical-forms',
            likes: 4,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fa',
            title: 'Lambda Calculus Notes',
            author: 'Alonzo Church',
            url: 'https://example.com/lambda-calculus',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fb',
            title: 'Structured Programming',
            author: 'Niklaus Wirth',
            url: 'https://example.com/structured-programming',
            likes: 9,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fc',
            title: 'The Art of Computer Programming',
            author: 'Donald Knuth',
            url: 'https://example.com/taocp',
            likes: 8,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fd',
            title: 'Compilers and Interpreters',
            author: 'Adele Goldberg',
            url: 'https://example.com/compilers-and-interpreters',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fe',
            title: 'Debugging Deeply',
            author: 'Barbara Liskov',
            url: 'https://example.com/debugging-deeply',
            likes: 2,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17ff',
            title: 'Systems Design Basics',
            author: 'Leslie Lamport',
            url: 'https://example.com/systems-design-basics',
            likes: 3,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1800',
            title: 'Concurrency Patterns',
            author: 'Edsger W. Dijkstra',
            url: 'https://example.com/concurrency-patterns',
            likes: 6,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1801',
            title: 'Software Reliability',
            author: 'Leslie Lamport',
            url: 'https://example.com/software-reliability',
            likes: 1,
            __v: 0
        }
    ]
    const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
  }
]

    test("of empty list is zero", () => {
        assert.strictEqual(listHelper.totalLikes(zeroBlogs), 0)

    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        assert.strictEqual(result, 57)
    })
    
    test('favorite blog', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        assert.deepStrictEqual(result,listWithManyBlogs[5])
    })

    test('most blogs', () => {
        const result = listHelper.mostBlogs(mosBlogs)
        assert.strictEqual(result.author, 'Edsger W. Dijkstra')
    })
    test('mostLikes', () => {
        const result = listHelper.mostLikes(blogs)
        assert.strictEqual(result, 17)
    })
})