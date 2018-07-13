const io = require('../socket')
var Conference = require('../../schemes/conferenceSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var usersOnline = require('../userList/usersStatus')

const createConference = io
  .of('/chat')
  .on('connection', function (socket) {
  socket.on('createConference', (data, fn) => {
    jwt.verify(data.token, 'omgSecret', function(err, decoded) {
      const from = decoded.id;
      const conferenceName = data.conferenceName;
      console.log(from, conferenceName)
      var conference = new Conference({ conferenceName: conferenceName, members:[from] });
      conference.save().then(item => fn(item))
    })
  })
});

module.exports = createConference
