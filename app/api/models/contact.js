var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = Schema({
  office : String,
  
  address : String,
  map : String,

  phone : String,
  email : String,
});

module.exports = {
  model : mongoose.model('Contact', ContactSchema, 'contacts'),
};