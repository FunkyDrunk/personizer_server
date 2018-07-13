const io = require('../socket')
var User = require('../../schemes/userSchema.js');
var Message = require('../../schemes/userMessagesSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var usersOnline = require('../userList/usersStatus')

const sendMessage = io
  .of('/chat')
  .on('connection', function (socket) {
  socket.on('viewMessages', (data, fn) => {
    jwt.verify(data.token, 'omgSecret', function(err, decoded) {
      const from = decoded.id;
      const to = data.userId;
      const message = data.message;
      Message.findOne({
        members: {
          $all: [from ,to]
        }
    }).exec( (err, res) => {
      if(res){
        res.messages = res.messages.map( elem => {
          if(elem.to === from){
            elem.viewed = true
          }
          return elem
        })
        res.save().then( (data) => {
          if(usersOnline[to]){
            usersOnline[to].forEach( socketsId => {
              socket.broadcast.to(socketsId).emit('viewMessages', {from: from, messages: data.messages});
            })
          }
        })
      }
    })
    })
  })
});

module.exports = sendMessage
