const io = require('../socket')
var User = require('../../schemes/userSchema.js');
var Message = require('../../schemes/userMessagesSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const getMessages = io
  .of('/chat')
  .on('connection', function (socket) {
  socket.on('getMessages', (data, fn) => {
    jwt.verify(data.token, 'omgSecret', function(err, decoded) {
      const userId = decoded.id;
      const otherUserId = data.userId;
      Message.findById(userId, (err, elem) => {
        if(elem){
          messages = elem.messages.map(elem => {
            if(elem.from===userId&&elem.to===otherUserId){
              return elem
            }
            if (elem.to===userId&&elem.from===otherUserId) {
              return elem
            }
          })
        }
      })
    })
  })
});

module.exports = getMessages
