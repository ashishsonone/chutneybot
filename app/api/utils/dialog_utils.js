
var extend = require('util')._extend
var witConfig = require('../config/wit.ai');
var dialogConfig = require('../config/dialog');

const {Wit, log} = require('node-wit');
const client = new Wit({accessToken: witConfig.accessToken});

function mergeBranches(tree, branches){
  for(var k in branches){
    var branchName = branches[k];
    var branchTree = require('../nodes/' + branchName).tree;
    //console.log("branchName = " + branchName + " %j", branchTree);
    tree = extend(tree, branchTree);
  }
  return tree;
}

/*
  example entities input
  {
    intent : [
      {
        confidence : 0.33,
        value : "greetings"
      }
    ],
    
    company : [
      {
        confidence : 0.51,
        value : "flipkart"
      },
      {
        confidence : 0.31,
        value : "Amazon"
      }
    ]
  }
*/
function pruneEntities(entities){
  var pruned = {};
  for(var entityName in entities){
    var items = entities[entityName];
    for(var i in items){
      var item = items[i];
      if(item.confidence > dialogConfig.CONFIDENCE){
        if(!pruned[entityName]){
          pruned[entityName] = {
            arr : [],
            map : {}
          }
        }
        
        var sItem = {
          confidence : item.confidence,
          value : item.value
        };
        
        pruned[entityName].arr.push(sItem);
        pruned[entityName].map[sItem.value] = sItem;
      }
    }
  }
  
  return pruned;
}

function witAnalyze(input){
  var promise = client.message(input);
  promise = promise.then(function(data){
    var entities = data.entities;
    var prunedEntities = pruneEntities(entities);
    //console.log("%j", prunedEntities);
    
    //console.log("%j %j", prunedEntities, prunedEntities.origin.arr[0].confidence);
    var result = {
      intent : {
        arr : [],
        map : {}
      },
      entities : prunedEntities
    };
    
    if(prunedEntities.intent){
      result.intent = prunedEntities.intent;
    }
    
    delete prunedEntities.intent;
    
    console.log("%j", result);
    return result;
  });
  
  return promise;
}

module.exports = {
  mergeBranches : mergeBranches,
  pruneEntities : pruneEntities,
  witAnalyze : witAnalyze
};