

var mongoose = require('mongoose');

var conferenceSchemaMessages = mongoose.Schema({
  messages: [
    {
      viewed:{
        type: Boolean,
        required: true,
        default: false,
      },
      conference: {
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

const ConferenceMessages = mongoose.model('ConferenceMessages', conferenceSchemaMessages)

module.exports = ConferenceMessages
