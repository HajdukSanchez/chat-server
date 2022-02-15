const { response, request } = require('express')
const User = require('../models/user')

const createUser = async (req = request, res = response) => {
  const newUser = new User(req.body) // Create a new user
  await newUser.save() // Save the user in the database

  res.json({
    ok: true,
    body: req.body,
  })
}

module.exports = {
  createUser,
}
