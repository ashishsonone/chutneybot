'use strict'
var express = require('express');
var shortid = require('shortid');
var RSVP = require('rsvp');

var router = express.Router();

var dialog = require('./dialog');
var menu = require('./menu');

var LogModel = require('./models/log').model;
var SessionModel = require('./models/session').model;

/*
  will contain the current state of the conversation
  this includes:
    context : memory
    handler : the function which will handle the next input
*/
var sessionMap = {};

function storeLog(session){
  for(var i=session.state.ts.length-1; i>0; i--){
    session.state.ts[i] = session.state.ts[i] - session.state.ts[i-1]
  }
  console.log('time measure %j', session.state.ts);

  console.log("return without storing into mongodb");
  
  return true;
  
  var promise = SessionModel.findOneAndUpdate(
    {sessionId : session.sessionId},
    {'$inc' : {count : 1}},
    {upsert : true}
  ).exec();
  
  //clean intent (remove arr key)
  var intent = session.state.intent;
  if(intent){
    delete intent.arr;
    intent = intent.map;
  }
  
  //clean entities(remove arr key from each entity mapping)
  var entities = session.state.entities;
  if(entities){
    for(var k in entities){
      delete entities[k].arr;
      entities[k] = entities[k].map;
    }
  }

  console.log("intent %j", intent);
  console.log("entities %j", entities);
  
  var logObject = new LogModel({
    sessionId : session.sessionId,
    context: session.context,

    input : session.state.input,
    output : session.state.output,
    suggestions : session.state.suggestions,

    nodesVisited : session.state.nodesVisited,
    intent : intent,
    entities : entities,

    activeNode : session.activeNode
  });
  logObject.save();
}

/*
  get the next response
  required:
    sessionId - string
    input - string
*/
router.post('/chat', function(req, res){
  console.log("\n");
  var sessionId = req.body.sessionId;
  
  if(!sessionId){
    sessionId = shortid.generate()
  }
  
  console.log("sessionId " + sessionId);
  var input = req.body.input; //supposed to be string
  var menuItem = req.body.menuItem; //json object

  var session = sessionMap[sessionId];

  if(!session){
    session = {};
    sessionMap[sessionId] = session;
    session.context = {};
    session.sessionId = sessionId;
  }

  //calling dialog.chat
  var promise;
  if(menuItem){
    promise = menu.handleMenu(session, menuItem);
  }
  else{
    promise = dialog.chat(session, input);
  }
  
  promise = promise.then(function(session){
    console.log("/chat : over and out ");
    
    session.state.ts.push(new Date().getTime());
    
    storeLog(session);
    
    return res.json({
      sessionId : session.sessionId,
      context : session.context,
      activeNode : session.activeNode,
      output : session.state.output,
      suggestions : session.state.suggestions,
      nodesVisited : session.state.nodesVisited
    });
  });

  promise.catch(function(err){
    res.status(500);
    res.json({
      error : "UNKNOWN"
    });
    
    console.log("ERROR %j", err);
  });

});

module.exports.router = router;