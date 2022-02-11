const { io: server } = require('../index')
const { CONNECT, DISCONNECT } = require('../types/global.types')

// Socket messages
server.on(CONNECT, (client) => {
  console.log(`Client connected`)

  // ON is for listening to the client
  client.on(DISCONNECT, () => {
    console.log('Client disconnected')
  })
})
