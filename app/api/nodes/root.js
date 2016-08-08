"use strict"
var tree = {
  "start" : {
    id : "start",
    condition : function(session){
      return !session.state.input;
    },
    
    reply : function(session){
      return {
        reply : "Hi I am WebChutney Bot. Call me Beta. Ask me something about WebChutney",
        suggestions : ["how to contact", "how can you help me", "show your best work", "work done for flipkart", "your top clients"]
      }
    },
    
    child : null,
    stop : true,
    sibling : "contact"
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
  
  "capabilities" : {
    id : "capabilities",
    condition : function(session){
      return session.state.intent.map["capabilities"];
    },
    
    reply : function(session){
      return {
        reply : "Ask me something about the company: portfolio, clients, or how to contact",
        suggestions : ["how can you help me", "show your best work", "work done for flipkart", "your top clients"]
      }
    },
    
    child : null,
    stop : true,
    sibling : "greetings"
  },
  
  "greetings" : {
    id : "greetings",
    condition : function(session){
      return session.state.intent.map["greetings"];
    },
    
    reply : function(session){
      return {
        reply : "I am cool. How may I help you?",
        suggestions : ["how can you help me", "show your best work", "work done for flipkart", "your top clients"]
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
        suggestions : ["how can you help me", "show your best work", "work done for flipkart", "your top clients"]
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
        suggestions : ["how can you help me", "show your best work", "work done for flipkart", "your top clients"]
      }
    },
    
    child : null,
    stop : true,
    sibling : null,
  },
};

var branches = [
  "contact",
  "work"
];

module.exports = {
  tree : tree,
  branches : branches
};