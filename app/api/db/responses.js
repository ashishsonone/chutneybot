var ResponseModel = require('../models/response').model;
var _ = require('underscore');
var sprintf = require("sprintf-js").sprintf;
var regexUtils = require('../utils/regex');

/*
x = 'Hi I am {me}, how are you {you}'
y = x.replace(/\{([a-z]+)\}/g, function(m, a){console.log(a); return '%(' + a + ')s'})
sprintf(y, {me : 'Ashish', you : 'Dhanesh'})
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
    var output = choosenResponse.output;
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
    
    console.log('getRandomResponse : output %j', output);

    return output;
  });
  
  return promise;
}

module.exports = {
  getRandomResponse : getRandomResponse,
};