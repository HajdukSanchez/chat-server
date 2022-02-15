const { response, request } = require('express')

const createUser = (req = request, res = response) => {
  res.json({
    ok: true,
    message: 'Creating user !!!',
  })
}

module.exports = {
  createUser,
}
