var suggestionsDb = require('../db/suggestions');
var awardsDb = require('../db/awards');
var responsesDb = require('../db/responses');

var _ = require('underscore');
var utils = require('../utils/utils');
var countingUtils = require('../utils/counting');

var tree = {
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
          var dict = {
            award : awardName
          };
          
          var p = responsesDb.getRandomResponse('awards-given-name-not-won', dict);
          p = p.then(function(output){
            return {
              reply : output,
              suggestions : _.sample(suggestionsDb.suggestions, 4)
            }
          });
          return p;
        }
        else{
          var name = awardsList[0].name;
          var count = countingUtils.getNumberInWords(awardsList.length);
          
          var dict = {
            count : count,
            award : name
          };
          
          var awardsReply = {
            _type : 'cards',
            value : awardsList
          };
          
          var p = responsesDb.getRandomResponse('awards-given-name-won', dict);
          
          p = p.then(function(output){
            output.push(awardsReply);
            return {
              reply : output,
              suggestions : _.sample(suggestionsDb.suggestions, 4)
            }
          });
          
          return p;        
        }
      });
      
      return promise;
    },
    
    child : null,
    stop : true,
    sibling : "awards.count"
  },
  
  "awards.count" : {
    id : "awards.count",
    condition : function(session){
      return false;
      return session.state.intent.map["award_count"];
    },
    
    reply : function(session){
      return {
        reply : "We have won 35 awards in total since our inception",
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : "awards.office"
  },
  
  "awards.office" : {
    id : "awards.office",
    condition : function(session){
      var place = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      return place;
    },
    
    reply : function(session){
      var place = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      
      var promise = awardsDb.getAwardsByOffice(place);
      
      promise = promise.then(function(awardsList){
        //workList = workDb.present(workList);
        var awardsReply = {
          _type : 'cards',
          value : awardsList
        };
        
        var dict = {
          office : place
        };
        
        var p = responsesDb.getRandomResponse('awards-given-office', dict);
        p = p.then(function(output){
          output.push(awardsReply);
          return {
            reply : output,
            suggestions : _.sample(suggestionsDb.suggestions, 4)
          }
        });
        
        return p;  
      });
      
      return promise;
    },
    
    child : null,
    stop : true,
    sibling : "awards.list",
  },
  
  "awards.list" : {
    id : "awards.list",
    condition : function(session){
      return true; //if into awards, and not asking about count, then this is it
    },
    
    reply : function(session){
      var year = utils.extractFirstEntityValue(session.state.entities, 'year', []);
      
      var dom_int = utils.extractFirstEntityValue(session.state.entities, 'dom_int', []);
      
      var promise;
      if(year){
        promise = awardsDb.getAwardsForYear(year);
        promise = promise.then(function(awardsList){
          if(awardsList.length == 0){
            var dict = {
              year : year
            };
            var p = responsesDb.getRandomResponse('awards-given-year-not-won', dict);
            
            return p;
          }
          else{
            var awardsReply = {
              _type : 'cards',
              value : awardsList
            }
            
            var dict = {
              year : year,
              count : countingUtils.getNumberInWords(awardsList.length)
            };
            
            var p = responsesDb.getRandomResponse('awards-given-year-won', dict);
            
            p = p.then(function(output){
              output.push(awardsReply);
              return output;
            });
            
            return p;
          }
        });
      }
      else if(dom_int){
        promise = awardsDb.getAwardsDomInt(dom_int);
        promise = promise.then(function(awardsList){
          var awardsReply = {
            _type : 'cards',
            value : awardsList
          };
          
          var p;
          if(dom_int=='domestic'){
            p = responsesDb.getRandomResponse('awards-given-domestic', {});
          }
          else{
            p = responsesDb.getRandomResponse('awards-given-international', {});
          }
          
          p = p.then(function(output){
            output.push(awardsReply);
            return output;
          });
          
          return p;
        });
      }
      else{
        //general awards show
        promise = awardsDb.getAwards(5);
        promise = promise.then(function(awardsList){
          var awardsReply = {
            _type : 'cards',
            value : awardsList
          }
          
          var p = responsesDb.getRandomResponse('awards-all', {});
          p = p.then(function(output){
            output.push(awardsReply);
            return output;
          });
          
          return p;
        });
      }
      
      promise = promise.then(function(output){
        //reply has been filled
        return {
          reply : output,
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