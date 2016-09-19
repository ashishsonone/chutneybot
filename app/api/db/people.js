var PersonModel = require('../models/person').model;

function getByPositionId(position){
  var promise = PersonModel.findOne({
    positionId : position
  }, {
    _id : false
  }).exec();
  
  return promise;
}

function getByNameId(name){
  var promise = PersonModel.findOne({
    nameId : name
  }, {
    _id : false
  }).exec();
  
  return promise;
}

module.exports = {
  getByPositionId : getByPositionId,
  getByNameId : getByNameId
};