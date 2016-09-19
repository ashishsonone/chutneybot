var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
  _type : String,
  
  name : String,
  nameId : String,
  
  logo : String,
  office : String,
});

module.exports = {
  model : mongoose.model('Client', ClientSchema, 'clients'),
};