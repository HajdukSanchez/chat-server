const { response, request } = require('express')
const Message = require('../models/message')

const getChatMessages = async (req = request, res = response) => {
  const myID = req.uid
  const fromMessages = req.params.from // We specify the parameter in the endpoint
  // We get the result by conditions
  // If message sender is me, or the message recipient is me, then we get the message
  const lastMessage = await Message.find({
    $or: [
      { from: myID, to: fromMessages },
      { from: fromMessages, to: myID },
    ],
  })
    .sort({ createdAt: 'desc' })
    .limit(30) // Last 30 messages sorted by date (oldest first)

  res.json({
    ok: true,
    messages: lastMessage,
  })
}

module.exports = {
  getChatMessages,
}
