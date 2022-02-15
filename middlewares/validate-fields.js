const { validationResult } = require('express-validator')
const { response, request } = require('express')

// Personalized middelware
const validateFields = (req = request, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // If there are errors, return the errors
    return res.status(400).json({ ok: false, error: errors.mapped() })
  }
  next() // If there are no errors, continue to the next middleware
}

module.exports = { validateFields }
