var WorkModel = require('../models/work').model;

var typeExpansionMap = {
  "on ground" : "On-ground experiences",
  "social media" : "Social Media",
  "branded content" : "Branded Content",
  "real time marketing" : "Real Time Marketing",
  "content" : "Content",
  "social media content" : "Social Media Content",
  "tech innovation" : "Tech Innovation",
  "film and social media innovation" : "Film and Social Media innovation"
};

function expandWorkType(typeList){
  typeList = typeList.map(function(type){
    return typeExpansionMap[type] || type;    
  });
  return typeList;
}

function present(workList){
  workList = workList.map(function(e){
    console.log("%j", e.type);
    e.type = expandWorkType(e.type);
    return e;
  });
  return workList;
}

function getWork(limit, skip){
  if(!skip){
    skip = 0;
  }
  
  var promise = WorkModel.find({
  }, {
    _id : false,
    __v : false,
    clientId : false,
  }).limit(limit).skip(skip).exec();
  
  return promise;
}

function getWorkForCompany(company){
  var promise = WorkModel.find({
    clientId : company
  }, {
    _id : false,
    __v : false,
    clientId : false,
  }).limit(5).exec();
  
  return promise;
}

function getWorkByOffice(office){
  var promise = WorkModel.find({
    office : office
  }, {
    _id : false,
    __v : false,
    clientId : false,
  }).limit(5).exec();
  
  return promise;
}

module.exports = {
  present : present,
  getWork : getWork,
  getWorkForCompany : getWorkForCompany,
  getWorkByOffice : getWorkByOffice
};