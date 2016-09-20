'use strict';

var teamDb = require('../db/team');
var suggestionsDb = require('../db/suggestions');

var utils = require('../utils/utils');
var _ = require('underscore');

//contact branches
var tree = {
  "team.intro" : {
    id : "team.intro",
    condition : function (session) {
      return true;
    },
    
    reply : function (session) {
      var reply = teamDb.getIntro();
      return {
        reply : reply,
        suggestions : ["more people", "portfolio"]
      };
    },
    
    child : "team.more",
    stop : true,
    sibling : null
  },
  
  "team.more" : {
    id : "team.more",
    condition : function (session) {
      var input = session.state.input;
      if(!input){
        return false;
      }
      input = input.toLowerCase();
      return session.state.input.indexOf("more") >= 0;
    },
    
    reply : function (session) {
      var promise = teamDb.moreAboutPeople();
      promise = promise.then(function(reply){
        return {
          reply : reply,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        };
      });
       
      return promise;
    },
    
    child : null,
    stop : true,
    sibling : null
  },
}

module.exports = {
  tree : tree
};