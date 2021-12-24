const mongoose = require('mongoose')
const { model, Schema } = mongoose

// Esquemas

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// 'Note' => debe ser en singular
// Los esquemas son a nivel de aplicación
const Note = model('Note', noteSchema)

module.exports = Note

// Note.find({}).then(result => {
//   console.log('result', result)
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'MongoDB es increible',
//   date: new Date(),
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log('result', result)
//     mongoose.connection.close()
//   })
//   .catch((error) => {
//     console.error(error)
//   })
