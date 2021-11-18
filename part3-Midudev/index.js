let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  },
  {
    content: 'Javascript is functional',
    date: '2021-11-10T20:28:27.911Z',
    important: false,
    id: 4
  },
  {
    content: 'Javascript is functional',
    date: '2021-11-10T20:28:27.911Z',
    important: false,
    id: 5
  },
  {
    content: 'huacho',
    date: '2021-11-10T20:32:56.491Z',
    important: false,
    id: 6
  }
]

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001
const logger = require('./loggerMiddleware')

app.use(cors()) // por defecto cualquier origen pueda conectarse a nuestra api
app.use(express.json())

app.use(logger)

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  console.log('request.params', request.params)
  const note = notes.find(note => note.id === parseInt(id))

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined'
      ? note.important
      : false,
    date: new Date().toISOString()
  }
  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.use((request, response, next) => {
  console.log('FIN')
  response.status(404).json({
    error: 'Not found'
  })
})

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})
