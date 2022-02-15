const { response, request } = require('express')
const User = require('../models/user')

const createUser = async (req = request, res = response) => {
  const { name, email, password } = req.body
  try {
    const emailExists = await User.findOne({ email }) // We check if the email already exists
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        message: 'Email already exists',
        body: {},
      })
    }
    const newUser = new User({ name, email, password }) // Create a new user
    await newUser.save() // Save the user in the database

    res.json({
      ok: true,
      message: 'User created',
      body: newUser,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error in the server, contact the admin',
      body: {},
    })
  }
}

module.exports = {
  createUser,
}
