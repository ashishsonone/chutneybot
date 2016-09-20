var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = Schema({
  _type : String,
  
  title : String,
  summary : String,
  
  client : String,
  link : String,
  
  thumbnail : String,
  type : [String],
  office : String,
});

module.exports = {
  model : mongoose.model('Work', WorkSchema, 'work'),
};