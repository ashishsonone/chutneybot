var PersonModel = require('../models/person').model;

function getByPositionId(position){
  var promise = PersonModel.findOne({
    positionId : position
  }, {
    _id : false,
    nameId : false,
    positionId : false,
  }).exec();
  
  return promise;
}

function getByNameId(name){
  var promise = PersonModel.findOne({
    nameId : name
  }, {
    _id : false,
    nameId : false,
    positionId : false,
  }).exec();
  
  return promise;
}

function getPeople(nameIdList){
  var query = {};
  if(nameIdList){
    query = {
      nameId : {
        $in : nameIdList
      }
    };
  }
  
  var promise = PersonModel.find(query, {
    _id : false,
    nameId : false,
    positionId : false,
  }).limit(6).exec();
  
  return promise;
}

module.exports = {
  getByPositionId : getByPositionId,
  getByNameId : getByNameId,
  getPeople : getPeople
};