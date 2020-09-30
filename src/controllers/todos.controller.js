const { Router } = require('express')
const Todo = require('../models/Todo')

const route = Router()

// GET
route.get('/', async (req, res) => {
  const todos = await Todo.find()

  res.send(todos)
})

route.post('/', async (req, res) => {
  const { text } = req.body
  const newTodo = new Todo({ text })

  await newTodo.save()
  res.send(newTodo)
})

module.exports = route
