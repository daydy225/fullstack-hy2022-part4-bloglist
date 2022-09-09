const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../tests/test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })


test('blogs are returned as json', async() => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

}, 100000)

test('All blogs are returned', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('verify unique blog id', async() => {
    const response = await api.get('/api/blogs')
    
    const blogToView = response.body[0]

    expect(blogToView.id).toBeDefined()
})

test('a blog can be added to the bloglist', async () => {
    const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const author = blogsAtEnd.map(b => b.author)

    expect(author).toContain('Robert C. Martin')

})

afterAll(() => {
    mongoose.connection.close()
})