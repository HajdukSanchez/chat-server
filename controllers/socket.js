const Message = require('../models/message')
const User = require('../models/user')

const manageConnection = async (uid = '', onlineStatus = false) => {
  const user = await User.findById(uid)
  user.online = onlineStatus
  await user.save() // save the new state of the user
  return user
}

const userConnected = async (uid = '') => {
  return manageConnection(uid, true)
}

const userDisconnected = async (uid = '') => {
  return manageConnection(uid, false)
}

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload)
    await message.save() // Save the message in the DB
    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  userConnected,
  userDisconnected,
  saveMessage,
}
