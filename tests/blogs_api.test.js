const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../tests/test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const user = require('../models/user')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('addition of new blog', () => {
  test('added successfully to the bloglist', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
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

  test('fails vwith status code 400 if title or author are not added ', async () => {
    const newBlog = {
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })
})

describe('verify the unique identifier of the blog post is named id', () => {
  test('id is not undefined', async () => {
    const response = await api.get('/api/blogs')

    const blogToView = response.body[0]

    expect(blogToView.id).toBeDefined()
  })
})

describe('deletion of a blog', () => {
  test('succeed with a status code 204 if id', async () => {
    const blogAtStart = await helper.blogsInDB()
    const blogToDelete = blogAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(blogAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('verify the likes property of blog is missing', () => {
  test('value default to 0', async () => {
    const blogNonExistingLikeProp = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
      .post('/api/blogs')
      .send(blogNonExistingLikeProp)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogResult = await helper.blogsInDB()

    const LikeDefaultToZero = blogResult[blogResult.length - 1]

    expect(LikeDefaultToZero.likes).toBe(0)
  })
})

describe('update information of a blog', () => {
  test('increasing the amount of likes', async () => {
    const blogAtStart = await helper.blogsInDB()

    const blogToUpdate = blogAtStart[0]

    const updateBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 8,
    }

    await api
      .put(`/api/blog/${blogToUpdate.id}`)
      .send(updateBlog)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when there is initially user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeed with a fresh username', async () => {
    const userAtStart = await helper.usersInDB()

    const newUser = {
      username: 'Daydy225',
      name: 'Daydy Belly',
      password: 'Belly2005',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await helper.usersInDB()
    expect(userAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = userAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const userAtStart = await helper.usersInDB()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'daydy',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const userAtEnd = await helper.usersInDB()
    expect(userAtEnd).toHaveLength(userAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
