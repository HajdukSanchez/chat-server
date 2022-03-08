require('dotenv').config() // Load .env file
const express = require('express')
const path = require('path')
const { dbConnection } = require('./database/config')
dbConnection() // Connect to database

const app = express() // Initialize express
// Reading and parse the body of the request
app.use(express.json()) // Parse JSON

// Node server
const server = require('http').createServer(app) // We connect our socket server with our application created with express

// Public path
const publicPath = path.resolve(__dirname, 'public')
module.exports.io = require('socket.io')(server) // If we do that, we can import and export at the same time in our index.js file
require('./sockets/socket')
app.use(express.static(publicPath)) // We serve public folder

// Routes
app.use('/api/login', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/messages', require('./routes/message'))

// We start the server on the port 3000
server.listen(process.env.PORT, (error) => {
  if (error) throw new Error(error)
  console.log(`Server is running on port ${process.env.PORT}`)
})
