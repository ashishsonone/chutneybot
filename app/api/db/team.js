var peopleDb = require('../db/people');

var intro = "Sidharth Rao & Sudesh Samaria are the Co-founders of Dentsu-Webchutney. Sidharth is CEO and Sudesh is CCO and the two of them together are Jai & Veeru (don’t ask me who is who!) You can read all about the awesome twosome here";


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