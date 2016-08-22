"use strict"
var suggestionsDb = require('../db/suggestions');
var aboutusDb = require('../db/aboutus');
var utils = require('../utils/utils');

var _ = require('underscore');

var tree = {
  "start" : {
    id : "start",
    condition : function(session){
      return !session.state.input;
    },
    
    reply : function(session){
      return {
        reply : "Hi I am WebChutney Bot. Call me Beta. Ask me something about WebChutney",
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
      var content = "So you want to know who our " + position + " is";
      
      var location = utils.extractFirstEntityValue(session.state.entities, 'location');
      if(location){
        content = "So you want to know who our " + position + " is at " + location + " location";
      }
      return {
        reply : content,
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
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
      
      return {
        reply : content,
        suggestions : _.sample(suggestionsDb.suggestions, 4)
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
    sibling : "intro"
  },
  
  "intro" : {
    id : "intro",
    condition : function(session){
      return session.state.intent.map["intro"];
    },
    
    reply : function(session){
      var company = utils.extractFirstEntityValue(session.state.entities, 'company', ['general']);

      var content = aboutusDb.intro['chutney'];
      if(company == 'chutney'){
        
      }
      else if(company == 'dentsu'){
        content = aboutusDb.intro['dentsu'];
      }
      else if(company){
        content = "I know nothing about " + company + ". Please ask something else";
      }
      
      return {
        reply : content,
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
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
        suggestions : _.sample(suggestionsDb.suggestions, 4)
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
    sibling : "awards"
  },
  
  "awards" : {
    id : "awards",
    condition : function(session){
      return session.state.entities['awards'];
    },
    
    reply : function(session){
      return {
        reply : "Asking about the awards, huh ! We are like a magnet for awards. ;)",
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : "awards.count",
    stop : false,
    sibling : "blackhole"
  },
  
  "contact" : {
    id : "contact",
    condition : function(session){
      return session.state.intent.map["contact"];
    },
    
    reply : function(session){
      return {
        reply : "Oh sure! You want to talk to a human. May I know your name please?",
        suggestions : ["Ram Gopal Verma", "Meena Kumari"]
      }
    },
    
    child : "contact.name",
    stop : true,
    sibling : "capabilities",
  },
  
  "work" : {
    id : "work",
    condition : function(session){
      return session.state.intent.map["work"];
    },
    
    reply : function(session){
      return {
        reply : "so you are interested in our work? That's good !! :P",
        suggestions : []
      }
    },
    
    child : "work.root",
    stop : false,
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
          type : "text",
          value : "I am unable to understand you. Please rephrase your query. In the mean time, look at these pics"
        },
        {
          type : "cards",
          value :[
            {
              type : "image",
              url : "https://pbs.twimg.com/profile_images/604644048/sign051.gif",
              "caption" : "Go"
            },
            {
              type : "image",
              url : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTD2CSNAfy2CSEXfvRPIUptJD6tf8S8-fhXbSsl1UF8qH7fxdv9g",
              "caption" : "Dog"
            },
            {
              type : "image",
              url : "http://www.vetmed.ucdavis.edu/vmth/local_resources/images/featured_images/small_animal.jpg",
              "caption" : "Cat"
            },
            {
              type : "image",
              url : "http://cdn.bleedingcool.net/wp-content/uploads/2011/11/Toy-Story-gang-reunites-for-Small-Fry-HCJ0RC5-x-large.jpg",
              "caption" : "Toy Story"
            },
            {
              type : "image",
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
  "awards"
];

module.exports = {
  tree : tree,
  branches : branches
};