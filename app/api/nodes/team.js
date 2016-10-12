'use strict';

var teamDb = require('../db/team');
var suggestionsDb = require('../db/suggestions');
var responsesDb = require('../db/responses');

var utils = require('../utils/utils');
var _ = require('underscore');
var cardUtils = require('../utils/card');

//contact branches
var tree = {
  "team.intro" : {
    id : "team.intro",
    condition : function (session) {
      return true;
    },
    
    reply : function (session) {
      var linkCard = teamDb.getIntroLink();
      var promise = responsesDb.getRandomResponse('team-intro', {});
      
      promise = promise.then(function(output){
        output.push(linkCard);
        
        return {
          reply : output,
          suggestions : ["more people", "portfolio"]
        };
      });
      return promise;
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
      var promise = teamDb.getImportantOnes();
      promise = promise.then(function(impPeople){
        impPeople = cardUtils.setCardType(impPeople, 'person-card');
        
        var impPeopleReply = {
          _type : 'cards',
          value : impPeople
        };
        
        var p = responsesDb.getRandomResponse('team-more', {});
        p = p.then(function(output){
          output.push(impPeopleReply);
          return output;
        });
        
        return p;
      });
      
      promise = promise.then(function(output){
        return {
          reply : output,
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