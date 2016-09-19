var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = Schema({
  _type : String,
  
  name : String,
  nameId : String,
  
  position : String,
  positionId : String,
  
  office : String,
  email : String,
  phone : String,

  photo : String,
  tweet : String,
  linkedin : String
});

module.exports = {
  model : mongoose.model('Person', PersonSchema, 'people'),
};