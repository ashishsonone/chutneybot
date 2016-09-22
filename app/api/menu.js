var RSVP = require('rsvp');
var _ = require('underscore');

var utils = require('./utils/utils');
var suggestionsDb = require('./db/suggestions');

function handleMenu(session, menuItem){
  session.activeNode = null; //reset the dialog conversation
  
  session.state = {
    menuItem : menuItem,
    nodesVisited : [],
    output : [],
    suggestions : [],
    ts : []
  };
  
  session.state.ts.push(new Date().getTime());
  
  var promise = RSVP.resolve(true);
  promise = promise.then(function(){
    var card1 = {
      _type : 'disclaimer-card',
      text : 'MENU FEAUTURE UNDER CONSTRUCTION'
    };
    
    var result = {
      _type : 'cards',
      value : [card1]
    };
    
    session.state.output = 
    session.state.output.concat([result]);
    session.state.suggestions = _.sample(suggestionsDb.suggestions, 4);
    return session;
  });
  
  return promise;
}

module.exports = {
  handleMenu : handleMenu
};