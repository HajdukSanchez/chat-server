const jwt = require('jsonwebtoken')
const { response, request } = require('express')
const { sendUnAuthorized } = require('../controllers/request')

const validateJWT = (req = request, res = response, next) => {
  // Read the Token
  const token = req.header('x-token')
  if (!token) sendUnAuthorized(res)
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY) // Decode the token and get the uid from the payload
    req.uid = uid // Add the uid to the request
    next()
  } catch (error) {
    return sendUnAuthorized(res, 'Invalid token')
  }
}

module.exports = { validateJWT }
