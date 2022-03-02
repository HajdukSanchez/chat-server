const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/jwt')
const { sendServerError, sendBadRequest, sendNotFound } = require('./request')

const createUser = async (req = request, res = response) => {
  const { name, email, password } = req.body
  try {
    const emailExists = await User.findOne({ email }) // We check if the email already exists
    if (emailExists) {
      return sendBadRequest(res, 'Email already exists')
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
      user: newUser,
      token,
    })
  } catch (error) {
    sendServerError(res)
  }
}

const login = async (req = request, res = response) => {
  const { email, password } = req.body
  try {
    const userDB = await User.findOne({ email }) // We check if the email already exists
    if (!userDB) {
      return sendNotFound(res, 'User not found')
    }

    // Validate password decoding the hash
    const validPassword = bcrypt.compareSync(password, userDB.password)
    if (!validPassword) {
      return sendBadRequest(res, 'Password is not valid')
    }

    // Generate the JWT
    const token = await generateJWT(userDB.id)

    res.json({
      ok: true,
      message: 'User login',
      user: userDB,
      token,
    })
  } catch (error) {
    sendServerError(res)
  }
}

const renovateJWT = async (req = request, res = response) => {
  // This 'req.uid' comes from 'validateJWT' middleware
  const uid = req.uid

  try {
    const token = await generateJWT(uid)
    const userDB = await User.findById(uid)

    res.json({
      ok: true,
      message: 'JWT renovated',
      user: userDB,
      token,
    })
  } catch (error) {
    sendServerError(res)
  }
}

module.exports = {
  createUser,
  login,
  renovateJWT,
}
