const { response, request } = require('express')
const { validationResult } = require('express-validator')

const createUser = (req = request, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // If there are errors, return the errors
    return res.status(400).json({ ok: false, error: errors.mapped() })
  }
  res.json({
    ok: true,
    message: 'Creating user !!!',
  })
}

module.exports = {
  createUser,
}
