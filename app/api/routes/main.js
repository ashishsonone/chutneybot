var CaseModel = require('../models/case').model;
var ResponseModel = require('../models/response').model;
var PersonModel = require('../models/person').model;
var AwardModel = require('../models/award').model;
var WorkModel = require('../models/work').model;
var ClientModel = require('../models/client').model;
var NewsModel = require('../models/news').model;
var ContactModel = require('../models/contact').model;

var router = require('express').Router();

//model : no default
var MODEL_MAP = {
  'case' : CaseModel,
  'response' : ResponseModel,
  'person' : PersonModel,
  'award' : AwardModel,
  'work' : WorkModel,
  'client' : ClientModel,
  'news' : NewsModel,
  'contact' : ContactModel
};

//id key : default _id
var ID_MAP = {
  'case' : 'name',
};

//sort key : no default
var SORT_MAP = {
  'case' : 'name',
  'response' : null,
  'person' : 'name',
  'award' : 'name',
  'work' : 'nick',
  'client' : 'name',
  'news' : 'date',
  'contact' : 'office'
};

//sort order : default 1
var SORT_ORDER = {
  'news' : -1
};

//get all limit : default 50
var LIMIT = {
  'news' : 10
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
  
  var limit = LIMIT[type] || 50;
  if(req.query.limit){
    limit = req.query.limit;
  }
  
  
  limit = parseInt(limit);
  
  var findQuery = {};
  //for 'response' type - special
  if(req.query.case){
    findQuery.case = req.query.case;
  }
  
  var sort = {};
  sort[SORT_MAP[type]] = SORT_ORDER[type] || 1;
  var promise = model
    .find(findQuery)
    .limit(limit)
    .sort(sort)
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
genRoutes('/people', 'person', router);
genRoutes('/awards', 'award', router);
genRoutes('/work', 'work', router);
genRoutes('/clients', 'client', router);
genRoutes('/news', 'news', router);
genRoutes('/contacts', 'contact', router);

module.exports = {
  router : router
};