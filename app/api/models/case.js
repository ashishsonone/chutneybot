var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaseSchema = Schema({
  name : String,
  description : String,
  variables : String
});

module.exports = {
  model : mongoose.model('Case', CaseSchema, 'cases'),
};