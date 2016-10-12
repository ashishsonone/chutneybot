var peopleDb = require('../db/people');

function getIntroLink(){
  return {
    _type : 'link-card',
    url : 'http://www.livemint.com/Leisure/xtddhxoPdjkQeBEwIy6LeM/Get-a-Glimpse-Digital-marketers.html'
  };
};

function getImportantOnes(){  
  var promise = peopleDb.getPeople(['sidharth', 'sudesh', 'gautam', 'aditiya']);
  
  return promise;
}

module.exports = {
  getIntroLink : getIntroLink,
  getImportantOnes : getImportantOnes
};