"use strict"
var suggestionsDb = require('../db/suggestions');
var aboutusDb = require('../db/aboutus');
var peopleDb = require('../db/people');

var utils = require('../utils/utils');

var _ = require('underscore');

var tree = {
  "start" : {
    id : "start",
    condition : function(session){
      return !session.state.input;
    },
    
    reply : function(session){
      var reply = [
        {
          _type : 'text',
          value : "Hi I am chutney's new chat bot. Call me Sid. Ask me something about WebChutney."
        },
        {
          _type : 'text',
          value : "To see what kind of questions you can ask look/tap at suggestions shown(in green) just below the input box. Or you can click on a menu item for a guided tour"
        }
      ]
      return {
        reply : reply,
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : "position"
  },
  
  "position" : {
    id : "position",
    condition : function(session){
      return session.state.entities["position"];
    },
    
    reply : function(session){
      var position = utils.extractFirstEntityValue(session.state.entities, 'position');
      var content = "So you want to know who our " + position + " is?";
      var location = utils.extractFirstEntityValue(session.state.entities, 'location');
      if(location){
        content = "So you want to know who our " + position + " is at " + location + " location";
      }
      var reply = [
        {
          _type : 'text',
          value : content
        }
      ];
      
      var promise = peopleDb.getByPositionId(position);
      promise = promise.then(function(person){
        if(!person){
          var notFound = {
            _type : 'text',
            value : 'Sorry, I am not fed with this info yet! I am still evolving as we speak'
          }
          reply.push(notFound);
        }
        else{
          reply[0].value = 'Here is what I know about our ' + person.position + ' ' + person.name;
          reply.push({
            _type : 'cards',
            value : [person]
          });
        }

        return {
          reply : reply,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        }
      });
      
      return promise;
    },
    
    child : null,
    stop : true,
    sibling : "person"
  },
  
  "person" : {
    id : "person",
    condition : function(session){
      return session.state.entities["person"];
    },
    
    reply : function(session){
      var name = utils.extractFirstEntityValue(session.state.entities, 'person');
      var content = "So you want to know who " + name + " is ?";
      
      var reply = [
        {
          _type : 'text',
          value : content
        }
      ];
      
      var promise = peopleDb.getByNameId(name);
      promise = promise.then(function(person){
        if(!person){
          var notFound = {
            _type : 'text',
            value : 'Sorry, I am not fed with this info yet! I am still evolving as we speak'
          }
          reply.push(notFound);
        }
        else{
          reply[0].value = 'Here is what I know about our ' + person.position + ' ' + person.name;
          reply.push(person);
        }

        return {
          reply : reply,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        }
      });
      
      return promise;
    },
    
    child : null,
    stop : true,
    sibling : "team"
  },
  
  "team" : {
    id : "team",
    condition : function(session){
      return session.state.intent.map["team"];
    },
    
    reply : function(session){
      return null;
    },
    
    child : "team.intro",
    stop : false,
    sibling : "owns"
  },
  
  "owns" : {
    id : "owns",
    condition : function(session){
      return session.state.intent.map["owns"];
    },
    
    reply : function(session){
      return {
        reply : "Dentsu Inc",
        suggestions : ["what is dentsu", "what does webchutney do"]
      }
    },
    
    child : null,
    stop : true,
    sibling : "founding_year"
  },
  
  "founding_year" : {
    id : "founding_year",
    condition : function(session){
      return session.state.intent.map["founding_year"];
    },
    
    reply : function(session){
      return {
        reply : "WebChutney was founded in 1999. We’re millennials too",
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : "clients"
  },
  
  "clients" : {
    id : "clients",
    condition : function(session){
      return session.state.intent.map["clients"];
    },
    
    reply : function(session){
      return null;
    },
    
    child : "clients.office",
    stop : false,
    sibling : "awards"
  },
  
  "awards" : {
    id : "awards",
    condition : function(session){
      return session.state.entities['awards'];
    },
    
    reply : function(session){
      return null;
      return {
        reply : "Asking about the awards, huh ! We are like a magnet for awards. ;)",
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      };
    },
    
    child : "awards.name",
    stop : false,
    sibling : "culture"
  },
  
  "culture" : {
    id : "culture",
    condition : function(session){
      var adjective = utils.extractFirstEntityValue(session.state.entities, 'adjective', []);
      return session.state.intent.map["culture"] || (adjective == 'cool');
    },
    
    reply : function(session){
      var reply = [
        {
          _type : 'text',
          value : "So here is our culture video. See for yourself. I'm sure you'll like it."
        },
        {
          _type : 'video-card',
          url : 'https://www.youtube.com/watch?v=I_-6YxaDiTk',
          title : 'the swag - dentsu webchutney'
        }
      ];
      return {
        reply : reply,
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : "news"
  },
  
  "news" : {
    id : "news",
    condition : function(session){
      var adjective = utils.extractFirstEntityValue(session.state.entities, 'adjective', []);
      return session.state.intent.map["news"] || (adjective == 'updates' || adjective == 'news');
    },
    
    reply : function(session){
      return {
        reply : "Look at the headlines we make every now and then",
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : "work"
  },
  
  "work" : {
    id : "work",
    condition : function(session){
      return session.state.intent.map["work"];
    },
    
    reply : function(session){
      return null;
    },
    
    child : "work.root",
    stop : false,
    sibling : "contact"
  },
  
  "contact" : {
    id : "contact",
    condition : function(session){
      return session.state.intent.map["contact"] || session.state.intent.map["address"];
    },
    
    reply : function(session){
      return null;
    },
    
    child : "contact.general",
    stop : false,
    sibling : "join"
  },
  
  "join" : {
    id : "join",
    condition : function(session){
      return session.state.intent.map["join"];
    },
    
    reply : function(session){
      return null;
    },
    
    child : "join.root",
    stop : false,
    sibling : "intro"
  },
  
  "intro" : {
    id : "intro",
    condition : function(session){
      return session.state.intent.map["intro"];
    },
    
    reply : function(session){
      var company = utils.extractFirstEntityValue(session.state.entities, 'company', []);

      var reply;
      var suggestions = _.sample(suggestionsDb.suggestions, 4);
      
      if(company == 'chutney'){
        reply = aboutusDb.getChunteyIntro();
        suggestions = ["ok! but what is DAN", "whats new ?"];
      }
      else if(company == 'dentsu'){
        reply = aboutusDb.intro['dentsu']; //text
      }
      else if(company){
        reply = "I know nothing about " + company + ". Please ask something else";
      }
      
      return {
        reply : reply,
        suggestions : suggestions
      }
    },
    
    child : null,
    stop : true,
    sibling : "self"
  },
  
  "self" : {
    //only the name of the company mentioned without any intent
    id : "self",
    condition : function(session){
      if(session.state.intent.arr.length > 0){
        return false;
      }
      var type = utils.extractFirstEntityType(session.state.entities, ['company']);
      if(type){
        return false;
      }
      var company = utils.extractFirstEntityValue(session.state.entities, 'company', ['general']);
      console.log("self : company : %j", company);
      if(company == "chutney" || company == "dentsu"){
        return true;
      }
      return false;
    },
    
    reply : function(session){
      var company = utils.extractFirstEntityValue(session.state.entities, 'company', ['general']);

      //company will either be 'dentsu' or 'chutney'
      return {
        reply : aboutusDb.intro[company],
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : "blackhole"
  },
  
  "blackhole" : {
    id : "blackhole",
    condition : function(session){
      return true;
    },
    
    reply : function(session){
      var output = [
        {
          _type : "text",
          value : "I am unable to understand you. Please rephrase your query. In the mean time, look at these pics"
        },
        {
          _type : "cards",
          value :[
            {
              _type : "image",
              url : "https://pbs.twimg.com/profile_images/604644048/sign051.gif",
              "caption" : "Go"
            },
            {
              _type : "image",
              url : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTD2CSNAfy2CSEXfvRPIUptJD6tf8S8-fhXbSsl1UF8qH7fxdv9g",
              "caption" : "Dog"
            },
            {
              _type : "image",
              url : "http://www.vetmed.ucdavis.edu/vmth/local_resources/images/featured_images/small_animal.jpg",
              "caption" : "Cat"
            },
            {
              _type : "image",
              url : "http://cdn.bleedingcool.net/wp-content/uploads/2011/11/Toy-Story-gang-reunites-for-Small-Fry-HCJ0RC5-x-large.jpg",
              "caption" : "Toy Story"
            },
            {
              _type : "image",
              url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnerdJ3_VUlZsnPSYVPJ9B2cYot9JbpCcpwmC3FJ5aFDYSGMrGag",
              "caption" : "Fancy car"
            }
          ]
        }
      ];
      return {
        reply : output,
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : null
  },
  
  "infinite" : {
    id : "infinite",
    condition : function(session){
      return true;
    },
    
    reply : function(session){
      return {
        reply : "I am stuck in infinite loop - unable to generate a response. Sorry for this rude behavior. Please ask something else.",
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : null,
  },
};

var branches = [
  "awards",
  "work",
  "clients",
  "team",
  "contact",
  "join"
];

module.exports = {
  tree : tree,
  branches : branches
};