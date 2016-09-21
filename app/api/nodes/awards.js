var suggestionsDb = require('../db/suggestions');
var awardsDb = require('../db/awards');

var _ = require('underscore');
var utils = require('../utils/utils');
var countingUtils = require('../utils/counting');

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
    sibling : "awards.name"
  },
  
  "awards.name" : {
    id : "awards.name",
    condition : function(session){
      var awardName = utils.extractFirstEntityValue(session.state.entities, 'awards', ['general']);
      return awardName;
    },
    
    reply : function(session){
      var awardName = utils.extractFirstEntityValue(session.state.entities, 'awards', ['general']);
      
      var promise = awardsDb.getAwardsByName(awardName);
      
      promise = promise.then(function(awardsList){
        if(awardsList.length == 0){
          var reply = "It seems we haven't yet won " + awardName + " award. But its never too late";
          return {
            reply : reply,
            suggestions : _.sample(suggestionsDb.suggestions, 4)
          }
        }
        else{
          var name = awardsList[0].name;
          var reply = [
            {
              _type : 'text',
              value : 'We won ' + countingUtils.getNumberInWords(awardsList.length) + ' ' + name + ' recently'
            },
            {
              _type : 'cards',
              value : awardsList
            }
          ];
          
          return {
            reply : reply,
            suggestions : _.sample(suggestionsDb.suggestions, 4)
          }
        }
      });
      
      return promise;
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
      
      var dom_int = utils.extractFirstEntityValue(session.state.entities, 'dom_int', []);
      
      var promise;
      if(year){
        reply[0].value = "Here are awards we've won in the year " + year;
        
        promise = awardsDb.getAwardsForYear(year);
        promise = promise.then(function(awardsList){
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
        });
      }
      else if(dom_int){
        reply[0].value = "Here are the notable " + dom_int + " awards we've won";
        
        promise = awardsDb.getAwardsDomInt(dom_int);
        promise = promise.then(function(awardsList){
          if(awardsList.length == 0){
            reply[0].value = "But oops, it seems we didn't win any " + dom_int + " awards";
          }
          else{
            var awardsReply = {
              _type : 'cards',
              value : awardsList
            }
            reply.push(awardsReply);
          }
        });
      }
      else{
        promise = awardsDb.getAwards(5);
        promise = promise.then(function(awardsList){
          var awardsReply = {
            _type : 'cards',
            value : awardsList
          }
          reply.push(awardsReply);
        });
      }
      
      promise = promise.then(function(){
        //reply has been filled
        return {
          reply : reply,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        }
      });
      return promise;
    },
    
    child : null,
    stop : true,
    sibling : null
  },
};

module.exports = {
  tree : tree
};