const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/jwt')

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
    const salt = bcrypt.genSaltSync() // Random salt
    newUser.password = bcrypt.hashSync(password, salt) // Encrypt the password
    await newUser.save() // Save the user in the database

    // Generate the JWT
    const token = await generateJWT(newUser.id)

    res.json({
      ok: true,
      message: 'User created',
      body: newUser,
      token,
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
