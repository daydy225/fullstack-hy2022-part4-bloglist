const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const { info, error } = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')

mongoose
  .connect(MONGODB_URI)
  .then(result => info('connected to MongoDB'))
  .catch(err => error('error connecting to MongoDB', err.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
