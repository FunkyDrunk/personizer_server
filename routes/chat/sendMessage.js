const io = require('../socket')
var User = require('../../schemes/userSchema.js');
var Message = require('../../schemes/userMessagesSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var usersOnline = require('../userList/usersStatus')

const sendMessage = io
  .of('/chat')
  .on('connection', function (socket) {
  socket.on('sendMessage', (data, fn) => {
    jwt.verify(data.token, 'omgSecret', function(err, decoded) {
      const from = decoded.id;
      const to = data.userId;
      const message = data.message;
      Message.findOne({
         members: { $all: [from ,to] }
      }).exec((err, elem) => {
        if(elem){
        Message.findOneAndUpdate({members: {
          $all: [from ,to]
        }
      }, { $push: {messages: {from, to, text: message} } } ).exec((err, elem) => {
        Message.findOne({
           members: { $all: [from ,to] }
        }).exec((err, elem) => {
          let newMessage = elem.messages.pop()

        socket.emit('giveNewMessage',{sender: true, message: newMessage})

        if(usersOnline[from]){
          usersOnline[from].forEach( socketsId => {
            socket.broadcast.to(socketsId).emit('giveNewMessage', {sender: true, message: newMessage});
          })
        }
        if(usersOnline[to]){
          usersOnline[to].forEach( socketsId => {
            socket.broadcast.to(socketsId).emit('giveNewMessage', {sender: false, message: newMessage});
          })
        }
        })
      })
        }
        else {
          var newMessage = new Message({ members:[from, to], messages:[{from, to, text: message}] });
          newMessage.save()
          .then(elem => {
            socket.emit('giveNewMessage',{sender: true, message: elem.messages[0]})
            if(usersOnline[from]){
              usersOnline[from].forEach( socketsId => {
                socket.broadcast.to(socketsId).emit('giveNewMessage', {sender: true, message: elem.messages[0]});
              })
            }
            if(usersOnline[to]){
              usersOnline[to].forEach( socketsId => {
                socket.broadcast.to(socketsId).emit('giveNewMessage', {sender: false, message: elem.messages[0]});
              })
            }
          })
          .catch(err => console.log(err));

        }
      })
    })
  })
});

module.exports = sendMessage
