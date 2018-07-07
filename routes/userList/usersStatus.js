const io = require('../socket')
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var usersOnline = {};

const usersStatus = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.on('sendStatus', (data, fn) => {
      jwt.verify(data, 'omgSecret', function(err, decoded) {
        usersOnline[decoded.id]?usersOnline[decoded.id].push(socket.id): usersOnline[decoded.id] = [socket.id];
        fn('online')
      })
      socket.broadcast.emit('statusChange');
    })
    socket.on('disconnect', () => {
        Object.keys(usersOnline).forEach(elem => {
          if(usersOnline[elem].includes(socket.id)) {
            usersOnline[elem] = usersOnline[elem].filter(elem => elem != socket.id)
            if(!usersOnline[elem].length) {
              delete usersOnline[elem]
            }
          }
        })
        socket.broadcast.emit('statusChange');
      });
  })


  module.exports = usersStatus;
  module.exports = usersOnline;
