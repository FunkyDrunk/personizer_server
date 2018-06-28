var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    login: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    avatar: {
      type: String,
    },
    job: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
});

const User = mongoose.model('User', userSchema)

module.exports = User
