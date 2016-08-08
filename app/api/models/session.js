var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = Schema({
  sessionId : String,
  count : {type : Number, default : 0}
},
{
  timestamps : {} //assigns default createdAt and updatedAt fields
});

module.exports = {
  model : mongoose.model('Session', SessionSchema, 'sessions'),
};