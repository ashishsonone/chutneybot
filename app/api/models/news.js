var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = Schema({
  headline : String,
  source : String,
  link : String,
  date : String
},
{
  timestamps : {} //assigns default createdAt and updatedAt fields
});

module.exports = {
  model : mongoose.model('News', NewsSchema, 'news'),
};