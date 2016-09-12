var suggestionsDb = require('../db/suggestions');
var _ = require('underscore');
var utils = require('../utils/utils');

var tree = {
  "awards.count" : {
    id : "awards.count",
    condition : function(session){
      return session.state.intent.map["award_count"]
    },
    
    reply : function(session){
      return {
        reply : "We have won 35 awards in total since our inception",
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : "awards.list"
  },
  
  "awards.list" : {
    id : "awards.list",
    condition : function(session){
      return session.state.intent.map["awards"] || session.state.entities['awards']
    },
    
    reply : function(session){
      var reply = "We have so many awards in our jhola. Here are a few of them";
      
      var year = utils.extractFirstEntityValue(session.state.entities, 'year', []);
      
      
      if(year){
        reply = "Here are awards we've won in the year " + year;
      }
      
      return {
        reply : reply,
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : "awards.list"
  },
};

module.exports = {
  tree : tree
};