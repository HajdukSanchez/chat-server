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

module.exports = {
  userConnected,
  userDisconnected,
}
