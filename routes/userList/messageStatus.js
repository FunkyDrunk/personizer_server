const io = require('../socket')
var User = require('../../schemes/userSchema.js');
var Message = require('../../schemes/userMessagesSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const usersStatus = io
  .of('/status')
  .on('connection', function (socket) {
    socket.on('newMessage', (data, fn) => {
      jwt.verify(data, 'omgSecret', function(err, decoded) {
        Message.find(members: $in:{decoded.id})
        .exec((err, elem) => {
          console.log(elem)
        })
      })
    })
  })


  module.exports = usersStatus;
  module.exports = usersOnline;
