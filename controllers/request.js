const { response } = require('express')

const sendServerError = (resp = response, message = 'Error in the server, contact the admin') => {
  return resp.status(500).json({
    ok: false,
    message: message,
  })
}

const sendBadRequest = (resp = response, message = 'Bad request') => {
  return resp.status(400).json({
    ok: false,
    message: message,
  })
}

const sendNotFound = (resp = response, message = 'Not found') => {
  return resp.status(404).json({
    ok: false,
    message: message,
  })
}

const sendUnAuthorized = (resp = response, message = 'Unauthorized, not token provided') => {
  return resp.status(401).json({
    ok: false,
    message: message,
  })
}

module.exports = {
  sendServerError,
  sendBadRequest,
  sendNotFound,
  sendUnAuthorized,
}
