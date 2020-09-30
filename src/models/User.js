const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { nextTick } = require('process')

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
})

userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
  next()
})

const User = new mongoose.model('user', userSchema)

module.exports = User
