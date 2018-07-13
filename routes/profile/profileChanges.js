const io = require('../socket')

const profileChanges = io
  .of('/chat')
  .on('connection', function (socket) {
  socket.on('profileChanges', (data, fn) => {
    socket.broadcast.emit('statusChange');
  })
});

module.exports = profileChanges
