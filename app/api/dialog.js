"use strict";

var dialogConfig = require('./config/dialog');
var dialogUtils = require('./utils/dialog_utils');

var RSVP = require('rsvp');

var root = require('./nodes/root');
var rootTree = root.tree;
var rootBranches = root.branches; //e.g ["contact"]

//merge by loading the branch mappings from respective files (e.g nodes/contact.js)
var rootNodeMap = dialogUtils.mergeBranches(rootTree, rootBranches);
//now rootNodeMap map contains all the nodes objects flat

/*
  session {
    context,
    sessionId,
    activeNode, //key of the node from where to start next; is updated after every chat response
    
    state : {
      nodesVisited : [], //keep track of nodes visited
      input : "how are you",
      
      output : [], //final - incrementally populated,
      suggestions : [] //final - overwritten at each node
      
      intent, //set once
      entities, //set once
      
      nextNode, //updated after passing through each node
      stop : T/F //updated after passing through each node
    }
  }
*/

function chain(session){
  //console.log("\n\nchain : entered with session %j", session);
  if(session.state.stop){
    console.log("chain : time to stop");
    return session; //we're done
  }
  
  if(session.state.nodesVisited.length > 50){
    session.state.nextNode = "infinite";
  }
  
  var nextNodeId = session.state.nextNode;
  if(nextNodeId == null){
    nextNodeId = dialogConfig.startNode;
  }
  
  console.log("chain : nextNodeId is `" + nextNodeId + "`");
  var node = rootNodeMap[nextNodeId];
  
  return executeNode(session, node).then(chain);
}

function executeNode(session, node){
  console.log(node.id + ": pushing to nodesVisited");
  session.state.nodesVisited.push(node.id);
  
  if(!node.condition(session)){
    session.state.nextNode = node.sibling;
    session.state.stop = false;
    console.log(node.id + ": early exit to sibling " + node.sibling);
    return RSVP.resolve(session);
  }
  
  var promise = RSVP.resolve(true).then(function(){
    console.log(node.id + ": calling node.reply")
    return node.reply(session);
  });
  
  promise = promise.then(function(out){
    //console.log(node.id + " out=%j", out);
    
    if(out.reply != null){
      console.log(node.id + ": non-null reply came");
      //assume out.reply & out.suggestions non-null
      if(typeof(out.reply) == "string"){
        //normalize
        out.reply = [
          {
            type : "text",
            value : out.reply
          }
        ];
      }

      //console.log(node.id + " out=%j", out);

      //append reply to state.output
      session.state.output = session.state.output.concat(out.reply);
      session.state.suggestions = out.suggestions;
    }
    else{
      console.log(node.id + ":early exit to child " + node.child);
    }
    //set further flow thru node's child
    session.state.nextNode = node.child;
    session.state.stop = node.stop;
    
    return session;
  });
  
  return promise;
}

function chat(session, input){
  session.state = {
    input : input,
    nodesVisited : [],
    output : [],
    suggestions : []
  };
  
  var promise = RSVP.resolve(true);
  if(input){
    console.log("chat : witAnalyze");
    promise = dialogUtils.witAnalyze(input);
    promise = promise.then(function(result){
      session.state.intent = result.intent;
      session.state.entities = result.entities;

      return session;
    });
  }
  else{
    console.log("chat : start no input");
    promise = RSVP.resolve(session);
  }
  
  promise = promise.then(function(session){
    if(!session.activeNode){
      session.activeNode = dialogConfig.startNode;
    }
    
    //setup for first chain() call
    session.state.nextNode = session.activeNode;
    session.state.stop = false;
    
    return chain(session);
  });
  
  promise = promise.then(function(session){
    session.activeNode = session.state.nextNode;
    console.log("chain end : final %j", session);
    return session;
  });
  
  return promise;
}

module.exports = {
  chat : chat
};