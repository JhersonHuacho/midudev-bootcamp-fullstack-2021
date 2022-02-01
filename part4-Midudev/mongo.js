const mongoose = require('mongoose')
// const password = require('./password')
// mongodb+srv://m001-student:<password>@sandbox.wqfe0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// const connectionString = `mongodb+srv://m001-student:${password}@sandbox.wqfe0.mongodb.net/notesDB?retryWrites=true&w=majority`
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

console.log('connectionString', connectionString)
if (!connectionString) {
  console.error('Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string. En las clases usamos MonoDB Atlas pero puedes usar cualquiera.')
}
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
