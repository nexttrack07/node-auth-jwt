const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const authController = require('./controllers/auth.controller')
const todosController = require('./controllers/todos.controller')

const MONGO_URI = 'mongodb://localhost:27017/auth'
const options = { useNewUrlParser: true }

mongoose
  .connect(MONGO_URI, options)
  .then(() => console.log('Successfully connected to the DB'))
  .catch(() => console.error('Error connecting to the DB'))

const app = express()
app.use(bodyParser.json())

app.use('/todos', todosController)
app.use('/auth', authController)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
