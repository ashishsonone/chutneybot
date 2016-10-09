var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = Schema({
  name : String,
  nameId : String, //id required
  
  position : String,
  positionId : String, //id required
  
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