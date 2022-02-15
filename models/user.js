const { Schema, model } = require('mongoose')

// We define the schema for the user model
const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
})

// We obtaine the output of the Model for send to the user
UserSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject() // We extract the object created by mongoose
  object.uid = _id // We rename the uid
  return object
})

module.exports = model('User', UserSchema)
