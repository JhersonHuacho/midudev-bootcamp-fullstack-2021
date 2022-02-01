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
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')

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

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(notFound)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.use(handleErrors)

const server = app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})

module.exports = {
  app,
  server
}
