const io = require('../socket')
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var usersOnline = require('./usersStatus')

const users = io
  .of('/chat')
  .on('connection', function (socket) {
  socket.on('getUsers', (data, fn) => {
    jwt.verify(data, 'omgSecret', function(err, decoded) {
      User.find()
      .then(users => users.filter(users => users._id != decoded.id))
      .then(users => users.map(users => {
          const {firstName, lastName, login, avatar, _id } = users;
          const online = Object.keys(usersOnline).some( elem => elem === _id + "")
          var user = {
            name: firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || login,
            avatar,
            id: _id,
            online,
          }
          return user
        })
      )
      .then(users => fn(users))
      console.log('send users')
    })
  })
});

module.exports = users
