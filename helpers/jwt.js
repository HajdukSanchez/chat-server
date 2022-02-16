const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    // This is the object that is going to be saved in the JWT
    const payload = { uid }
    jwt.sign(
      payload,
      process.env.JWT_KEY, // This is the secret key
      {
        expiresIn: '48h', // JWT expires in 48 hours
      },
      (err, token) => {
        if (err) {
          reject(`We can't generate the JWT, error: ${err}`)
        } else {
          resolve(token)
        }
      }
    )
  })
}

module.exports = {
  generateJWT,
}
