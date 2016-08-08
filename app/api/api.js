'use strict'
var express = require('express');
var shortid = require('shortid');

var router = express.Router();

var dialog = require('./dialog');

/*
  will contain the current state of the conversation
  this includes:
    context : memory
    handler : the function which will handle the next input
*/
var sessionMap = {};

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

  var session = sessionMap[sessionId];

  if(!session){
    session = {};
    sessionMap[sessionId] = session;
    session.context = {};
    session.sessionId = sessionId;
  }

  //calling dialog.chat
  var promise = dialog.chat(session, input);
  
  promise = promise.then(function(session){
    console.log("/chat : over and out ");
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