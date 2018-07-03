const io = require('../socket')
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const chatUser = io
  .of('/chat')
  .on('connection', function (socket) {
  socket.on('getUser', (data, fn) => {
    jwt.verify(data.token, 'omgSecret', function(err, decoded) {
      User.findById(data.userId)
      .then(user => {
        const {firstName, lastName, login, avatar, _id, job } = user;
        var userToSend = {
          name: firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || login,
          avatar,
          id: _id,
          job,
        }
        fn(userToSend)
      })
    })
  })
});

module.exports = chatUser
