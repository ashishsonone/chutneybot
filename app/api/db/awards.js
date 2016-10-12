var AwardModel = require('../models/award').model;

var awardTypeMapping = {
  "innovative use of technology" : "Innovative use of Technology",
  "branded microsite": "Branded Microsite",
  "mobile abby" : "Mobile ABBY",
  "film" : "Film",
  "creative abby" : "Creative ABBY",
  "use of ugc" : "Use of UGC",
  "innovative use of platform" : "Innovative use of platform"
};

function getAwards(limit, skip){
  if(!skip){
    skip = 0;
  }
  
  var promise = AwardModel.find({
  }, {
    _id : false,
    __v : false,
    nameId : false
  }).limit(limit).skip(skip).exec();
  
  return promise;
}

function getAwardsForYear(year){
  var promise = AwardModel.find({
    year : year
  }, {
    _id : false,
    __v : false,
    nameId : false
  }).limit(10).exec();
  
  return promise;
}

function getAwardsDomInt(dom_int){
  var promise = AwardModel.find({
    dom_int : dom_int
  }, {
    _id : false,
    __v : false,
    nameId : false
  }).limit(5).exec();
  
  return promise;
}

function getAwardsByName(name){
  var promise = AwardModel.find({
    nameId : name
  }, {
    _id : false,
    __v : false,
    nameId : false
  }).limit(5).exec();
  
  return promise;
}


function getAwardsByOffice(office){
  var promise = AwardModel.find({
    office : office
  }, {
    _id : false,
    __v : false,
    nameId : false
  }).limit(5).exec();
  
  return promise;
}

module.exports = {
  getAwards : getAwards,
  getAwardsForYear : getAwardsForYear,
  getAwardsDomInt : getAwardsDomInt,
  getAwardsByName : getAwardsByName,
  getAwardsByOffice : getAwardsByOffice
};