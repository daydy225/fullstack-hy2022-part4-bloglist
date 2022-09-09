const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async() => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

}, 100000)

test('there are two blogs', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})


test('verify unique blog id', async() => {
    const response = await api.get('/api/blogs')
    
    const blogToView = response.body[0]

    expect(blogToView.id).toBeDefined()
})


afterAll(() => {
    mongoose.connection.close()
})