var peopleDb = require('../db/people');

var intro = "Sidharth Rao & Sudesh Samaria are the Co-founders of Dentsu-Webchutney. Sidharth is CEO and Sudesh is CCO and the two of them together are Jai & Veeru (don’t ask me who is who!) You can read all about the awesome twosome here";


function getIntro(){
  return [
    {
      _type : 'text',
      value : intro
    },
    {
      _type : 'link-card',
      url : 'http://www.livemint.com/Leisure/xtddhxoPdjkQeBEwIy6LeM/Get-a-Glimpse-Digital-marketers.html'
    }
  ];
};

function moreAboutPeople(){
  var reply = [
    {
      _type : 'text',
      value : 'About the rest of the leadership, Here’s what our CEO (the real Sid) has to say'
    },
    {
      _type : 'quote-card',
      quote : "At Dentsu-Webchutney, we’re into misfits. We dig them because they are originals. They have done more than one thing with their lives, they make their own path, they take direction but not orders, they are entrepreneurs at heart. Every one of our leaders will run some part of the mother****g world someday. That’s why we’re immensely proud to have them as our generals. And once you get to know them you’ll love having them on your side too"
    },
    {
      _type : 'text',
      value : 'Look at our cool team. Click/tap to see image card with details'
    }
  ];
  
  var promise = peopleDb.getPeople(['sidharth', 'sudesh', 'gautam', 'aditiya']);
  promise = promise.then(function(list){
    var cards = {
      _type : 'cards',
      value : list
    };
    
    reply.push(cards);
    return reply;
  });
  
  return promise;
}

module.exports = {
  getIntro : getIntro,
  moreAboutPeople : moreAboutPeople
};