const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', { author: 1, title: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    const isUserExist = await User.findOne({ username })

    if (isUserExist) {
      return response.status(400).json({
        error: 'username must be unique',
      })
    }

    if (password === undefined || password.length === 0) {
      return response.status(400).json({ error: 'password is required' })
    } else if (password.length <= 3) {
      return response
        .status(400)
        .json({ error: 'password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter