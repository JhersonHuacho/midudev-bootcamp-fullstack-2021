const express = require('express')
const { Router } = express
const notesRouter = new Router()

const Note = require('../models/Note')

notesRouter.get('/api/notes', async (request, response) => {
  // Note.find({}).then(notes => {
  //   console.log('notes', notes)
  //   const newNotes = notes.map(note => {
  //     const { _id, _v, ...restOfNote } = note
  //     return {
  //       ...restOfNote,
  //       id: _id
  //     }
  //   })
  //   console.log('newNotes', newNotes)
  //   response.json(notes)
  // })
  const notes = await Note.find({})
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

notesRouter.get('/api/notes/:id', (request, response, next) => {
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

notesRouter.post('/api/notes', async (request, response, next) => {
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

  // newNote.save().then(savedNote => {
  //   response.json(savedNote)
  // }).catch(err => next(err))

  try {
    const savedNote = await newNote.save()
    response.json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/api/notes/:id', (request, response, next) => {
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

notesRouter.delete('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id
  // notes = notes.filter(note => note.id !== id)
  // Note.findByIdAndRemove(id)
  //   .then(() => response.status(204).end())
  //   .catch((error) => next(error))

  await Note.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = notesRouter
