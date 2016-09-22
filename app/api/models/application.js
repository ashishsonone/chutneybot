var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = Schema({
  name : String,
  position : String,
  
  branch : String,
  email : String,
  phone : String
},{
  timestamps : {}
});

module.exports = {
  model : mongoose.model('Application', ApplicationSchema, 'applications'),
};