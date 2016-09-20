var WorkModel = require('../models/work').model;

var works = [
  {
    _type : 'work-card',
    title : 'Flipkart First',
    summary : 'Bacchon wali ad',
    client : 'flipkart',
    link : 'http://flipkart.com',
    thumbnail : 'http://thumb.flipkart.com',
    type : ['banner'],
    office : 'mumbai'
  },
  {
    _type : 'work-card',
    title : 'Pepsi Thi Pe Gaya',
    summary : 'Cool ad',
    client : 'airtel',
    link : 'http://pepsi.com',
    thumbnail : 'http://thumb.pepsi.com',
    type : ['ad'],
    office : 'bengaluru'
  },
  {
    _type : 'work-card',
    title : 'Pepsi Thi Jeet Gaya',
    summary : 'Best pepsi ad',
    client : 'airtel',
    link : 'http://pepsi.com/peegaya',
    thumbnail : 'http://thumb.pepsi.com/jeetgaya',
    type : ['ad'],
    office : 'bengaluru'
  },
  {
    _type : 'work-card',
    title : 'Flipkart 2',
    summary : 'Bacchon wali ad',
    client : 'flipkart',
    link : 'http://flipkart.com',
    thumbnail : 'http://thumb.flipkart.com',
    type : ['banner'],
    office : 'mumbai'
  },
  {
    _type : 'work-card',
    title : 'Pepsi Thi Pe Gaya 3',
    summary : 'Cool ad',
    client : 'airtel',
    link : 'http://pepsi.com',
    thumbnail : 'http://thumb.pepsi.com',
    type : ['ad'],
    office : 'gurgaon'
  },
  {
    _type : 'work-card',
    title : 'Pepsi Thi Jeet Gaya 4',
    summary : 'Best pepsi ad',
    client : 'airtel',
    link : 'http://pepsi.com/peegaya',
    thumbnail : 'http://thumb.pepsi.com/jeetgaya',
    type : ['ad'],
    office : 'bengaluru'
  },
  {
    _type : 'work-card',
    title : 'Flipkart First 5',
    summary : 'Bacchon wali ad',
    client : 'flipkart',
    link : 'http://flipkart.com',
    thumbnail : 'http://thumb.flipkart.com',
    type : ['banner'],
    office : 'gurgaon'
  },
  {
    _type : 'work-card',
    title : 'Pepsi Thi Pe Gaya 6',
    summary : 'Cool ad',
    client : 'airtel',
    link : 'http://pepsi.com',
    thumbnail : 'http://thumb.pepsi.com',
    type : ['ad'],
    office : 'gurgaon'
  },
  {
    _type : 'work-card',
    title : 'Pepsi Thi Jeet Gaya 7',
    summary : 'Best pepsi ad',
    client : 'airtel',
    link : 'http://pepsi.com/peegaya',
    thumbnail : 'http://thumb.pepsi.com/jeetgaya',
    type : ['ad'],
    office : 'bengaluru'
  }
];

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
    clientId : false,
  }).limit(limit).skip(skip).exec();
  
  return promise;
}

function getWorkForCompany(company){
  var promise = WorkModel.find({
    clientId : company
  }, {
    _id : false,
    clientId : false,
  }).limit(5).exec();
  
  return promise;
}

function getWorkByOffice(office){
  var promise = WorkModel.find({
    office : office
  }, {
    _id : false,
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