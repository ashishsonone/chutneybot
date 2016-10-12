'use strict';

var workDb = require('../db/work');
var suggestionsDb = require('../db/suggestions');
var responsesDb = require('../db/responses');

var utils = require('../utils/utils');
var _ = require('underscore');
var cardUtils = require('../utils/card');

var tree = {
  "work.root" : {
    id : "work.root",
    condition : function (session) {
      var company = utils.extractFirstEntityValue(session.state.entities, 'company', ['dentsu', 'chutney']);
      return company;
    },
    
    reply : function (session) {
      var company = utils.extractFirstEntityValue(session.state.entities, 'company', ['dentsu', 'chutney']);
      
      var promise = workDb.getWorkForCompany(company);
      promise = promise.then(function(workList){
        //workList = workDb.present(workList);
        workList = cardUtils.setCardType(workList, 'work-card');
        console.log("work.root " + workList.length);
        
        if(workList.length > 0){
          var workReply = {
            _type : 'cards',
            value : workList
          };
          
          var dict = {
            company : workList[0].client
          };
          
          console.log("work.root getRandomResponse");
          var promise = responsesDb.getRandomResponse('work-given-company-worked', dict);
          
          promise = promise.then(function(output){
            console.log("work.root output.push");
            output.push(workReply);
            return output;
          });
          
          return promise;
        }
        else{
          var dict = {
            company : company
          };
          
          var promise = responsesDb.getRandomResponse('work-given-company-not-worked', dict);
          return promise;
        }
      });
      
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
    sibling : "work.place"
  },
  
  "work.place" : {
    id : "work.place",
    condition : function(session){
      var place = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      return place;
    },
    
    reply : function(session){
      var place = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      
      var promise = workDb.getWorkByOffice(place);
      
      promise = promise.then(function(workList){
        workList = cardUtils.setCardType(workList, 'work-card');
        //workList = workDb.present(workList);
        var workReply = {
          _type : 'cards',
          value : workList
        };
        
        var dict = {
          office : place
        };
        
        var p = responsesDb.getRandomResponse('work-given-office', dict);
        p = p.then(function(output){
          output.push(workReply);
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
    sibling : "work.general",
  },
  
  "work.general" : {
    id : "work.general",
    condition : function(session){
      return true;
    },
    
    reply : function(session){
      var promise = workDb.getWork(3);
      promise = promise.then(function(workList){
        workList = cardUtils.setCardType(workList, 'work-card');
        
        var workReply = {
          _type : 'cards',
          value : workList
        }
        
        var p = responsesDb.getRandomResponse('work-all', {});
        p = p.then(function(output){
          output.push(workReply);
          return {
            reply : output,
            suggestions : ["show more", "flipkart work"]
          }
        });
                
        return p;
      });
      return promise;
    },
    
    child : "work.more",
    stop : true,
    sibling : null,
  },
  
  
  "work.more" : {
    id : "work.more",
    condition : function(session){
      var input = session.state.input;
      if(!input){
        return false;
      }
      input = input.toLowerCase();
      return session.state.input.indexOf("more") >= 0;
    },
    
    reply : function(session){
      var promise = workDb.getWork(3, 3);
      promise = promise.then(function(workList){
        workList = cardUtils.setCardType(workList, 'work-card');
        
        var workReply = {
          _type : 'cards',
          value : workList
        };
        
        var p = responsesDb.getRandomResponse('work-all-more', {});
        p = p.then(function(output){
          output.push(workReply);
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
    sibling : null
  }
};

module.exports = {
  tree : tree
}