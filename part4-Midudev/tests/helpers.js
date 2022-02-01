const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')
const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo FullStack JS con francisco',
    important: true,
    date: new Date()
  },
  {
    content: 'Sigueme en Twitter',
    important: true,
    date: new Date()
  },
  {
    content: 'Gracias al chat por vuestra ayuda!',
    important: true,
    date: new Date()
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(note => note.content)
  return {
    contents,
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  initialNotes,
  api,
  getAllContentFromNotes,
  getUsers
}
