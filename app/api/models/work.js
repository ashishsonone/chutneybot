var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = Schema({
  nick : String, //id required to refer by award
  
  title : String,
  summary : String,
  
  client : String,
  clientId : String, //id required company
  
  link : String,
  
  thumbnail : String,
  type : [String],
  office : String,
});

module.exports = {
  model : mongoose.model('Work', WorkSchema, 'work'),
};