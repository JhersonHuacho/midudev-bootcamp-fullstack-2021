// let notes = []
require('dotenv').config()
require('./mongo')

const express = require('express')
const Sentry = require('@sentry/node') // Sentry
const Tracing = require('@sentry/tracing') // Sentry
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
const logger = require('./loggerMiddleware')
const Note = require('./models/Note')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

Sentry.init({
  dsn: 'https://7c1b989c44874ae6a068dbf7102e716c@o1092306.ingest.sentry.io/6110515',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use(cors()) // por defecto cualquier origen pueda conectarse a nuestra api
app.use(express.json())
app.use('/static', express.static('images'))
app.use(logger)

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    console.log('notes', notes)
    const newNotes = notes.map(note => {
      const { _id, _v, ...restOfNote } = note
      return {
        ...restOfNote,
        id: _id
      }
    })
    console.log('newNotes', newNotes)
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  console.log('request.params', request.params)
  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(err => next(err))
  // const note = notes.find(note => note.id === parseInt(id))

  // if (note) {
  //   response.json(note)
  // } else {
  //   response.status(404).end()
  // }
})

app.post('/api/notes', (request, response, next) => {
  const note = request.body

  if (!note.content) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined'
      ? note.important
      : false,
    date: new Date().toISOString()
  })

  newNote.save().then(savedNote => {
    response.json(savedNote)
  }).catch(err => next(err))

  // const ids = notes.map(note => note.id)
  // const maxId = Math.max(...ids)
  // const newNote = {
  //   id: maxId + 1,
  //   content: note.content,
  //   important: typeof note.important !== 'undefined'
  //     ? note.important
  //     : false,
  //   date: new Date().toISOString()
  // }
  // notes = [...notes, newNote]

  // response.status(201).json(newNote)
})

app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }
  // notes = notes.filter(note => note.id !== id)
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    }).catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  // notes = notes.filter(note => note.id !== id)
  Note.findByIdAndRemove(id)
    .then(() => response.status(404).end())
    .catch((error) => next(error))
})

app.use(notFound)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.use(handleErrors)

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})
