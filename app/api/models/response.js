var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResponseSchema = Schema({
  case : String,
  output : [String]
});

module.exports = {
  model : mongoose.model('Response', ResponseSchema, 'responses'),
};