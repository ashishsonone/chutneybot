var ContactModel = require('../models/contact').model;

var genericEmail = "contact@webchutney.net";

function getContact(office){
  var promise = ContactModel.findOne({
    office : office
  }, {
    _id : false
  }).limit(10).exec();
  
  return promise;
}

module.exports = {
  getContact : getContact,
  genericEmail : genericEmail
};