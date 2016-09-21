var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AwardSchema = Schema({
  _type : String,
  
  name : String,
  nameId : String,
  
  workNick : String,
  
  dom_int : String,
  year : String,
  clientId : String,
  
  type : [String],
  office : String,
});

module.exports = {
  model : mongoose.model('Award', AwardSchema, 'awards'),
};