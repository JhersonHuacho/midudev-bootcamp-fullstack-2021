const mongoose = require('mongoose')
const { server } = require('../index')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api, getUsers } = require('./helpers')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('password', saltRounds)
    const user = new User({
      username: 'huachinroot',
      name: 'HuachoRoot',
      passwordHash
    })

    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getUsers()
    const newUser = {
      username: 'huachindev',
      name: 'Huacho',
      password: 'huacho'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test(
    'creation fails with proper statuscode and message if username is already taken',
    async () => {
      const usersAtStart = await getUsers()
      const newUser = {
        username: 'huachinroot',
        name: 'HuachoRoot',
        password: 'password'
      }
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error.errors.username.message)
        .toContain('`username` to be unique')

      const usersAtEnd = await getUsers()

      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }
  )

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
