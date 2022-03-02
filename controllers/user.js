const { response, request } = require('express')
const User = require('../models/user')
const { sendServerError } = require('./request')

const getUsers = async (req = request, res = response) => {
  try {
    const uid = req.uid
    const offset = req.query.offset || 0
    const limit = req.query.limit || 20

    /*
    Get all users sorted by online status in true
    The find parameters filter all the users an return only the ones not logged in
    and has an offset and limit search parameter
    */
    const users = await User.find({ _id: { $ne: uid } })
      .sort({ online: -1 })
      .skip(offset)
      .limit(limit)

    res.json({
      ok: true,
      message: 'Users found',
      users,
    })
  } catch (error) {
    sendServerError(res)
  }
}

module.exports = {
  getUsers,
}
