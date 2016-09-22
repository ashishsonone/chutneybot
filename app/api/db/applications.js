var ApplicationModel = require('../models/application').model;

function saveApplication(context){
  var object = new ApplicationModel(context);
  var promise = object.save();
  promise = promise.then(function(result){
    console.log('saveApplication : success');
  });
}

module.exports = {
  saveApplication : saveApplication,
};