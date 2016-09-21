var suggestionsDb = require('../db/suggestions');
var contactsDb = require('../db/contacts');

var _ = require('underscore');
var utils = require('../utils/utils');
var countingUtils = require('../utils/counting');

//contact branches
var tree = {
  "contact.general" : {
    id : "contact.general",
    condition : function(session){
      var location = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      return !location;
    },
    
    reply : function(session){
      var reply = [
        {
          _type : 'text',
          value : 'Please mention which office contact you need - Mumbai, Gurgaon, or Bengaluru',
        }
      ];
        
      return {
        reply : reply,
        suggestions : ["Mumbai", "Bengaluru", "Gurgaon"]
      };
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
      promise = promise.then(function(contactObject){
        var reply = [
          {
            _type : 'text',
            value : 'There you go',
          },
          contactObject
        ];
        
        return {
          reply : reply,
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