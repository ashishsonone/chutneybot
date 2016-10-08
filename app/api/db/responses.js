var ResponseModel = require('../models/response').model;
var _ = require('underscore');

function getRandomResponse(scenario){
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
        return {
          _type : 'text',
          value : e
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