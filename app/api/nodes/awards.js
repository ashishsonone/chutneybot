var suggestionsDb = require('../db/suggestions');
var _ = require('underscore');

var tree = {
  "awards.root" : {
    id : "awards.root",
    condition : function(session){
      return session.state.intent.map["awards"] || session.state.entities['awards'];
    },
    
    reply : function(session){
      return {
        reply : "Into the awards node. I will undestand you award query and reply with an exact answer",
        suggestions : _.sample(suggestionsDb.suggestions, 4)
      }
    },
    
    child : null,
    stop : true,
    sibling : null
  },
};

module.exports = {
  tree : tree
};