const { response } = require('express')

const sendServerError = (resp = response, message = 'Error in the server, contact the admin') => {
  return resp.status(500).json({
    ok: false,
    message: message,
    body: {},
  })
}

const sendBadRequest = (resp = response, message = 'Bad request') => {
  return resp.status(400).json({
    ok: false,
    message: message,
    body: {},
  })
}

const sendNotFound = (resp = response, message = 'Not found') => {
  return resp.status(404).json({
    ok: false,
    message: message,
    body: {},
  })
}

module.exports = {
  sendServerError,
  sendBadRequest,
  sendNotFound,
}
