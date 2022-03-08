const { Schema, model } = require('mongoose')

const MessageSchema = Schema(
  {
    from: {
      type: Schema.Types.ObjectId, // Hace referencia a que este campo es un ObjectId existente dentro de la base de datos
      ref: 'User', // Se inidca la referencia de la collección con la que comparará el Type
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // We add the create and edition time in the database
)

// We obtaine the output of the Model for send to the user
MessageSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject() // We extract the object created by mongoose
  return object
})

module.exports = model('Message', MessageSchema)
