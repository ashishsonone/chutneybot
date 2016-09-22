'use strict';

var suggestionsDb = require('../db/suggestions');
var applicationsDb = require('../db/applications');

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
      var reply = [
        {
          _type : 'text',
          value : 'Why join us? Three reasons that I can think of right now.'
        },
        {
          _type : 'text',
          value : '#1 You don’t choose between making a trash-talking dustbin or an emo film about coping with memory loss. You just do both at Dentsu-Webchutney'
        },
        {
          _type : 'text',
          value : "#2. We have problems too. Like not having enough 'senior' citizens on the team. Be young, loud & proud at Dentsu-Webchutney."
        },
        {
          _type : 'text',
          value : '#3. You can check out anytime you like, but you wont ever leave. Get addicted to werk at Dentsu-Webchutney'
        },
        {
          _type : 'text',
          value : 'Ready to join? Just give a nod - yes or no'
        }
      ];
      
      return {
        reply : reply,
        suggestions : ["Yes", "No"]
      };
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

        return {
          reply : "Good ! May I know your name please ?",
          suggestions : ["Rakesh Gupta", "Shaina Mehra"],
          child : "join.name" //as will reply with name next
        }
      }
      else{
        return {
          reply : "No problem ! What else do you want to know about chutney?",
          suggestions : ["awards won", "portfolio", "contact details"],
          child : null //we're done with this branch of conversation
        };
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
      return {
        reply : "I didn't get - please reply with yes or no",
        suggestions : ["Yeah", "Nope"]
      };
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
      var text = "Great " + session.context.name + "! Which position are you looking for?";
      session.pauseWit = true;
      return {
        reply : text,
        suggestions : ["designer", "web developer"]
      };
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
      var text = "you branch preference ? - select from the 3 suggestions shown below";
      session.pauseWit = true;
      return {
        reply : text,
        suggestions : ["Mumbai", "Gurgaon", "Bengaluru"]
      };
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
      var text = "You email address";
      session.pauseWit = true;
      return {
        reply : text,
        suggestions : ["rakesh@gmail.com"]
      };
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
      var text = "Just one last detail, your phone number";
      session.pauseWit = true;
      return {
        reply : text,
        suggestions : ["8976208510"]
      };
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
      var reply = [
        {
          _type : 'text',
          value : "Thanks " + session.context['name'] + ". One of us will reach out to you soon. In the mean time look at our culture video to get a glipse of how cool we are !! And this is just the tip of an iceberg ;)"
        },
        {
          _type : 'video-card',
          url : 'https://www.youtube.com/watch?v=I_-6YxaDiTk',
          title : 'the swag - dentsu webchutney'
        }
      ];
      
      mailer.sendCandidateApplicationMail(session.context);
      applicationsDb.saveApplication(session.context);
      
      return {
        reply : reply,
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : null
  },
}

module.exports = {
  tree : tree
};