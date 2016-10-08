var CaseModel = require('../models/case').model;
var ResponseModel = require('../models/response').model;

var router = require('express').Router();

var MODEL_MAP = {
  'case' : CaseModel,
  'response' : ResponseModel,
};

var ID_MAP = {
  'case' : 'name',
};

function post(type, req, res){
  var model = MODEL_MAP[type];
  var object = new model(req.body);
  
  var promise = object.save();
  
  promise.then(function(result){
    res.json(result);
  });
  promise.catch(function(err){
    res.status(500);
    res.json(err);
  });
}

function put(type, req, res){
  var model = MODEL_MAP[type];
  
  var id = req.params.id;
  var object = req.body;
  
  var query = {};
  query[ID_MAP[type] || '_id'] = id;
  var promise = model.findOneAndUpdate(
    query, 
    object,
    {
      new : true,
      upsert : true
    }).exec();
  
  promise.then(function(result){
    res.json(result);
  });
  
  promise.catch(function(err){
    res.status(500);
    res.json(err);
  });
}

function get(type, req, res){
  var model = MODEL_MAP[type];
  
  var limit = 20;
  if(req.query.limit){
    limit = req.query.limit;
  }
  
  limit = parseInt(limit);
  
  var findQuery = {};
  var gte = req.query.gte;
  var lt = req.query.lt;
  
  var promise = model
    .find(findQuery)
    .limit(limit)
    .exec();
  promise = promise.then(function(result){
    res.json(result);
  });
  
  promise.catch(function(err){
    res.status(500);
    res.json(err);
  });
}

function getById(type, req, res){
  var model = MODEL_MAP[type];
  var id = req.params.id;
  
  var query = {};
  query[ID_MAP[type] || '_id'] = id;
  
  var promise = model
    .findOne(query)
    .exec();
  
  promise = promise.then(function(object){
    res.json(object);
  });
  
  promise.catch(function(err){
    res.status(500);
    res.json(err);
  });
}

function deleteById(type, req, res){
  var model = MODEL_MAP[type];
  var id = req.params.id;
  
  var query = {};
  query[ID_MAP[type] || '_id'] = id;
  
  var promise = model
    .findOneAndRemove(query)
    .exec();
  
  promise = promise.then(function(object){
    res.json({success : true});
  });
  
  promise.catch(function(err){
    res.status(500);
    res.json(err);
  });
}

function genRoutes(apiPath, esTypeName, router){
  router.post(apiPath, function(req, res){
    post(esTypeName, req, res);
  });
  
  router.put(apiPath + '/:id', function(req, res){
    put(esTypeName, req, res);
  });
  
  router.get(apiPath, function(req, res){  
    get(esTypeName, req, res);
  });
  
  router.get(apiPath + '/:id', function(req, res){
    getById(esTypeName, req, res);
  });
  
  router.delete(apiPath + '/:id', function(req, res){
    deleteById(esTypeName, req, res);
  });
}

genRoutes('/cases', 'case', router);
genRoutes('/responses', 'response', router);

module.exports = {
  router : router
};