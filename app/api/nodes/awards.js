var suggestionsDb = require('../db/suggestions');
var awardsDb = require('../db/awards');

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
      return true; //if into awards, and not asking about count, then this is it
    },
    
    reply : function(session){
      var reply = [
        {
          _type : 'text',
          value : "We have so many awards in our bucket - you'll be surprised !"
        }
      ];
      
      var year = utils.extractFirstEntityValue(session.state.entities, 'year', []);
      
      var awardsList;
      if(year){
        reply[0].value = "Here are awards we've won in the year " + year;
        
        awardsList = awardsDb.getAwardsForYear(year);
        if(awardsList.length == 0){
          reply[0].value = "But oops, it seems we didn't win any in the year " + year;
        }
        else{
          var awardsReply = {
            _type : 'cards',
            value : awardsList
          }
          reply.push(awardsReply);
        }
      }
      else{
        awardsList = awardsDb.getAwards(5);
        var awardsReply = {
          _type : 'cards',
          value : awardsList
        }
        reply.push(awardsReply);
      }
      
      return {
        reply : reply,
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : null
  },
};

module.exports = {
  tree : tree
};