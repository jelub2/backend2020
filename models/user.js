// Sources:
// https://medium.com/edureka/node-js-mongodb-tutorial-fa80b60fb20c
// https://www.freecodecamp.org/news/mongoose101/

const mongoose    = require('mongoose');

//mongoose Schema (String, Number, Boolean, Array, Date, ObjectId)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  date:{
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User
