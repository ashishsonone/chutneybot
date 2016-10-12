var suggestionsDb = require('../db/suggestions');
var contactsDb = require('../db/contacts');
var responsesDb = require('../db/responses');

var _ = require('underscore');
var utils = require('../utils/utils');
var countingUtils = require('../utils/counting');
var cardUtils = require('../utils/card');

//contact branches
var tree = {
  "contact.general" : {
    id : "contact.general",
    condition : function(session){
      var location = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      return !location;
    },
    
    reply : function(session){
      var promise = responsesDb.getRandomResponse('contact-ask-location', {});
      
      promise = promise.then(function(output){
        return {
          reply : output,
          suggestions : ["Mumbai", "Bengaluru", "Gurgaon"]
        };
      });
      
      return promise;
    },
    
    child : "contact.office",
    stop : true,
    sibling : "contact.office"
  },
  
  "contact.office" : {
    id : "contact.office",
    condition : function(session){
      var location = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      return location;
    },
    
    reply : function(session){
      var location = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      
      var promise = contactsDb.getContact(location);
      var contactCard = null;
      
      promise = promise.then(function(contactObject){
        contactObject = cardUtils.setCardType(contactObject, 'contact-card');
        contactCard = contactObject;
        return responsesDb.getRandomResponse('contact-done');
      });
      
      promise = promise.then(function(output){
        output.push(contactCard);
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
  }
}

module.exports = {
  tree : tree
};