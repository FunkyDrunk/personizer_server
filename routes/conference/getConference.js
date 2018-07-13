const io = require('../socket')
var Conference = require('../../schemes/conferenceSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const getConference = io
  .of('/chat')
  .on('connection', function (socket) {
  socket.on('getConference', (data, fn) => {
    console.log('get conference')
    jwt.verify(data.token, 'omgSecret', function(err, decoded) {
      const user = decoded.id;
      Conference.find({
        members: { $all: [user] }
      })
      .then(conference => {
        fn(conference)
      })
    })
  })
});

module.exports = getConference
