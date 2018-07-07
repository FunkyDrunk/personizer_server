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
      const user = decoded.id;
      const otherUserId = data.userId;
      Message.find({
         members: { $all: [user] }
      })
      .exec((err, elems) => {
        if(elems){
          var userMessages = {}
          elems.forEach(elem => {
            const member = elem.members.filter(users => users != user)
            userMessages[member] = elem.messages.reverse()
          })
          fn(userMessages)
          // elem.message = elem.messages.map( elem => {
          //   if(elem.to === user) {
          //     elem.viewed = true;
          //     return elem
          //   }
          //   else {
          //     return elem
          //   }
          // })
          // elem.save()
        }
        else {
          fn([])
        }
      })
    })
  })
});

module.exports = getMessages
