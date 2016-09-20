'use strict';

var workDb = require('../db/work');
var suggestionsDb = require('../db/suggestions');

var utils = require('../utils/utils');
var _ = require('underscore');

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
        workList = workDb.present(workList);
        
        if(workList.length > 0){
          var reply = [{
            _type : 'text',
            value : 'Here is what we have done for our client ' + company,
          }];

          var workReply = {
            _type : 'cards',
            value : workList
          }
          reply.push(workReply);
        }
        else{
          var reply = [{
            _type : 'text',
            value : "It seems we haven't worked for " + company + " yet. Or I dont have that info in my brain cells right now."
          }];
        }
      
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
        workList = workDb.present(workList);
        var reply = [{
          _type : 'text',
          value : "Here's what our " + place + " office has executed"
        }];

        var workReply = {
          _type : 'cards',
          value : workList
        };
        
        reply.push(workReply);

        return {
          reply : reply,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        }
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
        workList = workDb.present(workList);
        var reply = [{
          _type : 'text',
          value : "Here is a part of our portfolio"
        }];

        var workReply = {
          _type : 'cards',
          value : workList
        }
        reply.push(workReply);

        return {
          reply : reply,
          suggestions : ["show more", "flipkart work"]
        }
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
        workList = workDb.present(workList);
        var reply = [{
          _type : 'text',
          value : "Here is next set of work. Remember to werk it"
        }];

        var workReply = {
          _type : 'cards',
          value : workList
        };
        reply.push(workReply);

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
  }
};

module.exports = {
  tree : tree
}