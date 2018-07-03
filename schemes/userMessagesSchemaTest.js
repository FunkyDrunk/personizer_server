var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    messages: [
      {
          to:{
          type: String,
          required: true,
        },
          from: {
            type: String,
            required: true,
          },
          text:{
            type: String,
            required: true,
        },
          created:{
            type: Date,
            default: Date.now,
        },
      }
    ],

});

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
