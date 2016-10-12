'use strict';

var suggestionsDb = require('../db/suggestions');
var applicationsDb = require('../db/applications');
var responsesDb = require('../db/responses');

var utils = require('../utils/utils');
var _ = require('underscore');
var mailer = require('../utils/mailer');

//contact branches
var tree = {
  "join.root" : {
    id : "join.root",
    condition : function (session) {
      return true;
    },
    
    reply : function (session) {
      var promise = responsesDb.getRandomResponse('join-intro-ask-yes-no', {});
      
      promise = promise.then(function(output){
         return {
          reply : output,
          suggestions : ["Yes", "No"]
        };
      });
      return promise;
    },
    
    child : "join.yes_no",
    stop : true,
    sibling : null
  },
  
  "join.yes_no" : {
    id : "join.yes_no",
    condition : function (session) {
      return session.state.entities["yes_no"];
    },
    
    reply : function (session) {
      var yesNo = session.state.entities["yes_no"].arr[0].value;
      if(yesNo == 'yes'){
        session.pauseWit = true; //one time flag to pause running wit analyze. An optimization while taking raw input like name, phone, email

        var promise = responsesDb.getRandomResponse('join-ask-name', {});
        promise = promise.then(function(output){
          return {
            reply : output,
            suggestions : ["Rakesh Gupta", "Shaina Mehra"],
            child : "join.name" //as will reply with name next
          }
        });
        return promise;
      }
      else{
        var promise = responsesDb.getRandomResponse('join-replied-no', {});
        promise = promise.then(function(output){
          return {
            reply : output,
            suggestions : ["awards won", "portfolio", "contact details"],
            child : null //we're done with this branch of conversation
          };
        });
        return promise;
      }
    },
    
    child : null, //override here in reply
    stop : true,
    sibling : "join.invalid"
  },
  
  "join.invalid" : {
    id : "join.invalid",
    condition : function (session) {
      return true
    },
    
    reply : function (session) {
      var promise = responsesDb.getRandomResponse('join-replied-invalid');
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : ["Yeah", "Nope"]
        };
      });
      return promise;
    },
    
    child : "join.yes_no",
    stop : true,
    sibling : null
  },
  
  "join.name" : {
    id : "join.name",
    condition : function (session) {
      return true;
    },
    
    reply : function (session) {
      session.context['name'] = session.state.input;
      var dict = {
        name : session.context['name']
      };
      var promise = responsesDb.getRandomResponse('join-ask-position', dict);
      
      session.pauseWit = true;
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : ["designer", "web developer"]
        };
      });
      return promise;
    },
    
    child : "join.position",
    stop : true,
    sibling : null
  },
  
  "join.position" : {
    id : "join.position",
    condition : function (session) {
      return true;
    },
    
    reply : function (session) {
      session.context['position'] = session.state.input;
      
      var dict = {
        name : session.context['name'],
        position : session.context['position']
      };
      var promise = responsesDb.getRandomResponse('join-ask-location', dict);
      
      session.pauseWit = true;

      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : ["Mumbai", "Gurgaon", "Bengaluru"]
        };
      });
      
      return promise;
    },
    
    child : "join.branch",
    stop : true,
    sibling : null
  },
  
  "join.branch" : {
    id : "join.branch",
    condition : function (session) {
      return true;
    },
    
    reply : function (session) {
      session.context['branch'] = session.state.input;
      
      var dict = {
        name : session.context['name'],
        position : session.context['position'],
        branch : session.context['branch']
      };
      var promise = responsesDb.getRandomResponse('join-ask-email', dict);
      
      session.pauseWit = true;
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : ["rakesh@gmail.com"]
        };
      });
      return promise;
    },
    
    child : "join.email",
    stop : true,
    sibling : null
  },
  
  "join.email" : {
    id : "join.email",
    condition : function (session) {
      return true;
    },
    
    reply : function (session) {
      session.context['email'] = session.state.input;
      
      var dict = {
        name : session.context['name'],
        position : session.context['position'],
        branch : session.context['branch']
      };
      var promise = responsesDb.getRandomResponse('join-ask-phone', dict);
      
      session.pauseWit = true;
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : ["8976208510"]
        };
      });
      return promise;
    },
    
    child : "join.phone",
    stop : true,
    sibling : null
  },
  
  "join.phone" : {
    id : "join.phone",
    condition : function (session) {
      return true;
    },
    
    reply : function (session) {
      session.context['phone'] = session.state.input;
      
      var dict = {
        name : session.context['name'],
        position : session.context['position'],
        branch : session.context['branch']
      };
      var promise = responsesDb.getRandomResponse('join-done', dict);
      
      session.pauseWit = true;
      mailer.sendCandidateApplicationMail(session.context);
      applicationsDb.saveApplication(session.context);
      
      promise = promise.then(function(output){
        output.push({
          _type : 'video-card',
          url : 'https://www.youtube.com/watch?v=I_-6YxaDiTk',
          title : 'the swag - dentsu webchutney'
        });
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