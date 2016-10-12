"use strict"
var suggestionsDb = require('../db/suggestions');
var peopleDb = require('../db/people');
var responsesDb = require('../db/responses');
var newsDb = require('../db/news');

var utils = require('../utils/utils');
var cardUtils = require('../utils/card');
var _ = require('underscore');

var tree = {
  "start" : {
    id : "start",
    condition : function(session){
      return !session.state.input;
    },
    
    reply : function(session){
      var promise = responsesDb.getRandomResponse('welcome', {});
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        }
      });
      
      return promise;
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
      
      var promise = peopleDb.getByPositionId(position);
      promise = promise.then(function(person){
        person = cardUtils.setCardType(person, 'person-card');
        if(!person){
          var dict = {
            position : position
          };
          
          var p = responsesDb.getRandomResponse('who-position-not-found', dict);
          
          return p;
        }
        else{
          var dict = {
            position : person.position,
            name : person.name
          };
          var p = responsesDb.getRandomResponse('who-position-found', dict);
          
          p = p.then(function(output){
            output.push(person);
            return output;
          });
          return p;
        }
      });
      
      promise = promise.then(function(output){
        return {
          reply : output,
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
      
      var promise = peopleDb.getByNameId(name);
      promise = promise.then(function(person){
        person = cardUtils.setCardType(person, 'person-card');
        if(!person){
          var dict = {
            name : name
          };
          
          var p = responsesDb.getRandomResponse('who-name-not-found', dict);
          
          return p;
        }
        else{
          var dict = {
            position : person.position,
            name : person.name
          };
          var p = responsesDb.getRandomResponse('who-name-found', dict);
          
          p = p.then(function(output){
            output.push(person);
            return output;
          });
          return p;
        }
      });
      
      promise = promise.then(function(output){
        return {
          reply : output,
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
      var promise = responsesDb.getRandomResponse('owns', {});
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : ["what is dentsu", "what does webchutney do"]
        }
      });
      
      return promise;
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
      var promise = responsesDb.getRandomResponse('founding-year', {});
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        }
      });
      
      return promise;
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
      var videoCard = {
        _type : 'video-card',
        url : 'https://www.youtube.com/watch?v=I_-6YxaDiTk',
        title : 'the swag - dentsu webchutney'
      };
      
      var p = responsesDb.getRandomResponse('culture', {});
      p = p.then(function(output){
        output.push(videoCard);
        return {
          reply : output,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        };
      });
      
      return p;
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
      var promise = newsDb.getNews();
      promise = promise.then(function(newsList){
        newsList = cardUtils.setCardType(newsList, 'news-card');
        var newsReply = {
          _type : 'cards',
          value : newsList
        };
        var p = responsesDb.getRandomResponse('news', {});
        p = p.then(function(output){
          output.push(newsReply);
          return {
            reply : output,
            suggestions : _.sample(suggestionsDb.suggestions, 4)
          };
        });
        return p;
      });
      
      return promise;
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
    sibling : "services"
  },
  
  "services" : {
    id : "services",
    condition : function(session){
      return session.state.intent.map["services"];
    },
    
    reply : function(session){
      var promise = responsesDb.getRandomResponse('services', {});
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        }
      });
      return promise;
    },
    
    child : null,
    stop : true,
    sibling : "greeting"
  },
  
  "greeting" : {
    id : "greeting",
    condition : function(session){
      return session.state.intent.map["greeting"];
    },
    
    reply : function(session){
      var promise = responsesDb.getRandomResponse('greeting', {});
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        }
      });
      return promise;
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
      var company = utils.extractFirstEntityValue(session.state.entities, 'company', []);

      var promise;
      var suggestions = _.sample(suggestionsDb.suggestions, 4);
      
      if(company == 'chutney'){
        promise = responsesDb.getRandomResponse('intro-chutney', {});
        suggestions = ["ok! but what is DAN"];
      }
      else if(company == 'dentsu'){
        promise = responsesDb.getRandomResponse('intro-dentsu', {});
      }
      else if(company){
        promise = responsesDb.getRandomResponse('intro-other-company', {company : company});;
      }
      
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : suggestions
        }
      });
      
      return promise;
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

      var promise;
      var suggestions = _.sample(suggestionsDb.suggestions, 4);
      
      if(company == 'chutney'){
        promise = responsesDb.getRandomResponse('intro-chutney', {});
        suggestions = ["ok! but what is DAN"];
      }
      else{
        promise = responsesDb.getRandomResponse('intro-dentsu', {});
      }
      
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : suggestions
        }
      });
      
      return promise;
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
      var suggestions = ["contact details"];
      suggestions = suggestions.concat(_.sample(suggestionsDb.suggestions, 3));
      
      var dict = {
        name : 'buddy',
        self : 'botney'
      };
      
      var promise = responsesDb.getRandomResponse('gibberish', dict);
      
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : suggestions
        };
      });
      
      return promise;
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