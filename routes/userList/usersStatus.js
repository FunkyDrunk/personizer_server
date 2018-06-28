const io = require('../socket')
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var usersOnline = {};

const usersStatus = io
  .of('/status')
  .on('connection', function (socket) {
    socket.on('sendStatus', (data, fn) => {
      jwt.verify(data, 'omgSecret', function(err, decoded) {
        usersOnline[decoded.login] = socket.id;
        fn('online')
      })
      socket.broadcast.emit('statusChange');
    })
    socket.on('disconnect', () => {
        console.log(socket.id)
        Object.keys(usersOnline).forEach(elem => {
          console.log(usersOnline[elem] === socket.id)
          if(usersOnline[elem] === socket.id) {
            delete usersOnline[elem]
          }
        })
        socket.broadcast.emit('statusChange');
      });
  })


  module.exports = usersStatus;
  module.exports = usersOnline;
