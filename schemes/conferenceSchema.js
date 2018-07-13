var mongoose = require('mongoose');

var conferenceSchema = mongoose.Schema({
    conferenceName: {
      type: String,
      required: true,
    },
    members: [],
});

const Conference = mongoose.model('Conference', conferenceSchema)

module.exports = Conference
