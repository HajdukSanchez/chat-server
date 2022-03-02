const { io: server } = require('../index')
const { CONNECT, DISCONNECT } = require('../types/global.types')
const { findOutJWT } = require('../helpers/jwt')

// Socket messages
server.on(CONNECT, (client) => {
  console.log(`Client connected`)
  const [isValid, uid] = findOutJWT(client.handshake.headers['x-token']) // Find out if the JWT is valid

  if (!isValid) client.disconnect() // If the JWT is not valid, disconnect the client

  // ON is for listening to the client
  client.on(DISCONNECT, () => {
    console.log('Client disconnected')
  })
})
