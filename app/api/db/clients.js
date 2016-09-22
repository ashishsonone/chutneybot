var ClientModel = require('../models/client').model;

function getClients(){
  var promise = ClientModel.find({
  }, {
    _id : false,
    nameId : false
  }).limit(10).exec();
  
  return promise;
}

function getClientsByOffice(office){
  var promise = ClientModel.find({
    office : office
  }, {
    _id : false,
    nameId : false
  }).limit(10).exec();
  
  return promise;
}

module.exports = {
  getClients : getClients,
  getClientsByOffice : getClientsByOffice
};