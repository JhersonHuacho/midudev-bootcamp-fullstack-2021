const mongoose = require('mongoose')
// const password = require('./password')
// mongodb+srv://m001-student:<password>@sandbox.wqfe0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// const connectionString = `mongodb+srv://m001-student:${password}@sandbox.wqfe0.mongodb.net/notesDB?retryWrites=true&w=majority`
const connectionString = process.env.MONGO_DB_URI

console.log('process.env.MONGO_DB_URI', process.env.MONGO_DB_URI)
// conexión a mongodb
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  })
  .catch((error) => {
    console.error(error)
  })

process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
