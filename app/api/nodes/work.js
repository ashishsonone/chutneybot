'use strict';

var workDb = require('../db/work');
var utils = require('../utils/utils');

var tree = {
  "work.root" : {
    id : "work.root",
    condition : function (session) {
      var company = utils.extractFirstEntityValue(session.state.entities, 'company', ['dentsu', 'chutney']);
      return company;
    },
    
    reply : function (session) {
      var company = utils.extractFirstEntityValue(session.state.entities, 'company', ['dentsu', 'chutney']);
      
      var workList = workDb.getWorkForCompany(company);
      if(workList.length > 0){
        var reply = [{
          type : 'text',
          value : 'Here is what we have done for our client ' + company,
        }];
        
        //convert each in workList into work card
        workList = workList.map(function(e){e.type = 'work-card'; return e});
        var workReply = {
          type : 'cards',
          value : workList
        }
        reply.push(workReply);
      }
      else{
        var reply = [{
          type : 'text',
          value : "It seems we haven't worked for " + company + " yet"
        }];
      }
      
      return {
        reply : reply,
        suggestions : ["work by awards", "about siddharth"]
      };
    },
    
    child : null,
    stop : true,
    sibling : "work.general"
  },
  
  "work.general" : {
    id : "work.general",
    condition : function(session){
      return true;
    },
    
    reply : function(session){
      var workList = workDb.getWork(5);
      var reply = [{
        type : 'text',
        value : "Here is a part of our portfolio"
      }];

      //convert each in workList into work card
      workList = workList.map(function(e){e.type = 'work-card'; return e});
      var workReply = {
        type : 'cards',
        value : workList
      }
      reply.push(workReply);
      
      return {
        reply : reply,
        suggestions : ["hi", "hello"]
      }
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
      var workList = workDb.getWork(5, 5);
      var reply = [{
        type : 'text',
        value : "Here is next set of work. Remember to werk it"
      }];

      //convert each in workList into work card
      workList = workList.map(function(e){e.type = 'work-card'; return e});
      var workReply = {
        type : 'cards',
        value : workList
      }
      reply.push(workReply);
      
      return {
        reply : reply,
        suggestions : ["hi", "hello"]
      }
    },
    
    child : null,
    stop : true,
    sibling : null
  }
};

module.exports = {
  tree : tree
}