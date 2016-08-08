var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = Schema({
  sessionId : String,
  context : Schema.Types.Mixed,

  input : Schema.Types.Mixed,
  output : Schema.Types.Mixed,
  suggestions : [String],
  
  nodesVisited : [String],
  intent : Schema.Types.Mixed,
  entities : Schema.Types.Mixed,
  
  activeNode : String
},
{
  timestamps : {} //assigns default createdAt and updatedAt fields
});

module.exports = {
  model : mongoose.model('Log', LogSchema, 'logs'),
};