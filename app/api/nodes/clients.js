'use strict';

var clientsDb = require('../db/clients');
var suggestionsDb = require('../db/suggestions');

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
        var reply = [{
          _type : 'text',
          value : 'Clients for which our ' + location + ' office has worked for :',
        }];

        var workReply = {
          _type : 'cards',
          value : list
        };
        reply.push(workReply);

        return {
          reply : reply,
          suggestions : _.sample(suggestionsDb.suggestions, 4)
        };
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
        var reply = [{
          _type : 'text',
          value : 'Just look at our ever growing list of clients ;)',
        }];

        var workReply = {
          _type : 'cards',
          value : list
        };
        reply.push(workReply);

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
  },
}

module.exports = {
  tree : tree
};