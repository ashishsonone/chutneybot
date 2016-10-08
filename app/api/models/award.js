var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AwardSchema = Schema({
  _type : String,
  
  name : String,
  nameId : String, //id required (query by award name)
  
  workNick : String,
  
  dom_int : String,
  year : String,
  clientId : String, //id required (for company entitiy)
  
  type : [String], //just use the original string, no mapping required
  office : String,
});

module.exports = {
  model : mongoose.model('Award', AwardSchema, 'awards'),
};