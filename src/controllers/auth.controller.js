const bcrypt = require('bcrypt')
const { Router } = require('express')
const User = require('../models/User')

const route = Router()

// Register
route.post('/register', async (req, res) => {
  const { email, password } = req.body
  const newUser = new User({ email, password })

  await newUser.save()
  res.send({ email })
})

route.post('/login', async (req, res) => {
  // query by email in our database
  const { email, password } = req.body

  const user = await User.findOne({ email })
  // if the email does not exist, send error
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }
  // hash password and compare to the stored hash
  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }
  // if the hash and the password don't match, send error
  // send success

  res.send({ email })
})

module.exports = route
