"use strict"
var RSVP = require('rsvp');

function handle(count){
  var x = Math.random();
  var result = {
    count : count + 1,
    stop : (x < 0.2)
  };

  console.log("handle returning " + result.stop);

  return RSVP.resolve(result);
}

function decide(result){
  if(result.stop){
    return result;
  }
  return handle(result.count).then(decide);
}

function chat(){
  var promise = handle(0);
  promise = promise.then(decide);

  promise = promise.then(function(result){
    console.log("Terminated with %j", result);
  });
}

//chat();

var u = require('./utils/utils');

var entities = {
  company : {
    map : {
      'flipkart' : {},
      'dentsu' : {},
      'chutney' : {},
      'general' : {}
    },
    arr : []
  },
  
  location : {
    map : {
      'mumbai' : {},
      'banglore' : {},
      'gurgaon' : {}
    }
  }
};

module.exports = {
  entities : entities,
  u : u
};