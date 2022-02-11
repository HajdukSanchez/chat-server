const mogoose = require('mongoose')

// Connection
const dbConnection = async () => {
  try {
    await mogoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Database is connected')
  } catch (error) {
    console.error(error)
    throw new Error('Data base error, contact with support')
  }
}

module.exports = {
  dbConnection,
}
