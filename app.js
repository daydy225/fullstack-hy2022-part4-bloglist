const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config/config')
const { info } = require('./config/logger')
const blogsRouter = require('./controllers/blogs')

mongoose
  .connect(MONGODB_URI)
  .then(result => info('connected to MongoDB'))
  .catch(err => error('error connecting to MongoDB', err.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs/', blogsRouter)

module.exports = app
