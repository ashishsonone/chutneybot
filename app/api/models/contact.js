var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = Schema({
  _type : String,
  
  office : String,
  
  address : String,
  map : String,

  phone : String,
  email : String,
});

module.exports = {
  model : mongoose.model('Contact', ContactSchema, 'contacts'),
};