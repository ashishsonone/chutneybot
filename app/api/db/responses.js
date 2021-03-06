var ResponseModel = require('../models/response').model;
var _ = require('underscore');
var sprintf = require("sprintf-js").sprintf;
var regexUtils = require('../utils/regex');

/*
  cases/scenarios :
  
  (7)
  - greeting
  - welcome
  - gibberish
  - intro-chutney
  - intro-dentsu
  - intro-other-company
  - services
  
  (9)
  - join-intro-ask-yes-no
  - join-replied-no
  - join-replied-invalid
  - join-ask-name
  - join-ask-position
  - join-ask-location
  - join-ask-email
  - join-ask-phone
  - join-done
  
  (2)
  - contact-ask-location
  - contact-done
  
  (5)
  - work-given-company-worked
  - work-given-company-not-worked
  - work-given-office
  - work-all
  - work-all-more
  
  (4)
  - who-position-found
  - who-position-not-found
  - who-name-found
  - who-name-not-found
  
  (2)
  - team-intro
  - team-more
  
  (2)
  - owns
  - founding-year
  
  (2)
  - clients-given-office
  - clients-all
  
  (8)
  - awards-given-name-not-won
  - awards-given-name-won
  - awards-given-office
  - awards-given-year-not-won
  - awards-given-year-won
  - awards-given-domestic
  - awards-given-international
  - awards-all
  
  (0)
  - culture
  - news
*/

function getRandomResponse(scenario, dict){
  console.log('getRandomResponse : enter ' + scenario);
  var promise = ResponseModel.find({
    case : scenario
  }, {
    _id : false
  }).limit(5).exec();
  
  promise = promise.then(function(responses){
    console.log('getRandomResponse : responses size %j', responses.length);

    var choosenResponse = _.sample(responses, 1)[0];
    var output = choosenResponse && choosenResponse.output;
    console.log('getRandomResponse : output %j', output);
    if(output){
      output = output.map(function(e){
        var t = regexUtils.prepareTemplate(e, dict);
        var o = sprintf(t, dict);
        
        return {
          _type : 'text',
          value : o
        }
      });
    }
    else{
      output = [
        {
          _type : 'text',
          value : "Unable to respond to this scenario - '" + scenario + "'. Please feed me responses."
        }
      ]
    }
    
    console.log('getRandomResponse : output %j', output);

    return output;
  });
  
  return promise;
}

module.exports = {
  getRandomResponse : getRandomResponse,
};