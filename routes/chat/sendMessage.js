const io = require('../socket')
var User = require('../../schemes/userSchema.js');
var Message = require('../../schemes/userMessagesSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

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
          console.log(elem)
        Message.findOneAndUpdate({members: {
          $all: [from ,to]
        }
        }, { $push: {messages: {from, to, text: message} } })
        .catch(err => console.log(err))
        }
        else {
          var newMessage = new Message({ members:[from, to], messages:[{from, to, text: message}] });
          newMessage.save().catch(err => console.log(err));
        }
      })
      socket.emit('giveNewMessage', 'haha')
    })
  })
});

module.exports = sendMessage
// Message.findById(from, (err, elem) => {
//   if(elem){
//     console.log(elem)
//   Message.findByIdAndUpdate(from, { $push: {messages: {from, to, text: message} } })
//   .catch(err => console.log(err))
//   }
//   else {
//     console.log('elem')
//     var newMessage = new Message({ _id:from, message:[{from, to, text: message}] });
//     newMessage.save().catch(err => console.log(err));
//   }
// })
// Message.findById(to, (err, elem) => {
//   if(elem){
//     console.log(elem)
//   Message.findByIdAndUpdate(to, { $push: {messages: {to, from, text: message} } })
//   .catch(err => console.log(err))
//   }
//   else {
//     console.log('elem')
//     var newMessage = new Message({ _id:to, message:[{to, from, text: message}] });
//     newMessage.save().catch(err => console.log(err));
//   }
// })
