const mogoose = require('mongoose')

// Connection
const dbConnection = async () => {
  try {
    console.log('Connected to database...')
  } catch (error) {
    console.error(error)
    throw new Error('Data base error, contact with support')
  }
}

module.exports = {
  dbConnection,
}
