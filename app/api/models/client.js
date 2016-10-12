var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
  name : String,
  nameId : String, //id required
  
  logo : String,
  office : String,
});

module.exports = {
  model : mongoose.model('Client', ClientSchema, 'clients'),
};