'use strict';

var clientsDb = require('../db/clients');
var suggestionsDb = require('../db/suggestions');
var responsesDb = require('../db/responses');

var utils = require('../utils/utils');
var _ = require('underscore');

//contact branches
var tree = {
  "clients.office" : {
    id : "clients.office",
    condition : function (session) {
      var location = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      return location;
    },
    
    reply : function (session) {
      var location = utils.extractFirstEntityValue(session.state.entities, 'place', []);
      
      var promise = clientsDb.getClientsByOffice(location);
      promise = promise.then(function(list){
        var workReply = {
          _type : 'cards',
          value : list
        };
        
        var dict = {
          office : location
        };
        
        var p = responsesDb.getRandomResponse('clients-given-office', dict);
        
        p = p.then(function(output){
          output.push(workReply);
          
          return {
            reply : output,
            suggestions : _.sample(suggestionsDb.suggestions, 4)
          }
        });
        
        return p;
      });
       
      return promise;
    },
    
    child : null,
    stop : true,
    sibling : "clients.all"
  },
  
  "clients.all" : {
    id : "clients.all",
    condition : function (session) {
      return true;
    },
    
    reply : function (session) {
      var promise = clientsDb.getClients();
      promise = promise.then(function(list){
        var workReply = {
          _type : 'cards',
          value : list
        };
        
        var p = responsesDb.getRandomResponse('clients-all', {});
        
        p = p.then(function(output){
          output.push(workReply);
          
          return {
            reply : output,
            suggestions : _.sample(suggestionsDb.suggestions, 4)
          }
        });
        
        return p;
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