var RSVP = require('rsvp');

function handleMenu(session, menuItem){
  session.activeNode = null; //reset the dialog conversation
  
  session.state = {
    menuItem : menuItem,
    nodesVisited : [],
    output : [],
    suggestions : []
  };
  
  var promise = RSVP.resolve(true);
  promise = promise.then(function(){
    var card1 = {
      type : 'people-card',
      name : 'Siddharth Rao',
      position : 'CEO',
      contact : 'You dont contact Sid, he contacts you'
    };
    
    var result = {
      type : 'cards',
      value : [card1]
    };
    
    session.state.output = 
    session.state.output.concat([result]);
    session.state.suggestions = ['What is dentsu'];
    return session;
  });
  
  return promise;
}

module.exports = {
  handleMenu : handleMenu
};