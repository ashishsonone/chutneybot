"use strict"

function remove(arr, excludeList){
  for(var i in excludeList){
    var item = excludeList[i];
    var index = arr.indexOf(item);
    if(index >= 0){
      console.log("removing " + index + " item " + item);
      arr.splice(index, 1); //modifies original
    }
  }
}

function extractEntityValues(entities, type, excludeList){
  var result = [];
  if(entities[type] && entities[type].map){
    var keys = Object.keys(entities[type].map);
    remove(keys, excludeList);
    return keys;
  }
  
  return result;
}

function extractFirstEntityValue(entities, type, excludeList){
  var result = extractEntityValues(entities, type, excludeList);
  return result[0];
}

function extractEntityTypes(entities, excludeList){
  var keys = Object.keys(entities);
  remove(keys, excludeList);
  return keys;
}

function extractFirstEntityType(entities, excludeList){
  var result = extractEntityTypes(entities, excludeList);
  return result[0];
}

module.exports = {
  extractEntityValues : extractEntityValues,
  extractFirstEntityValue : extractFirstEntityValue,
  extractEntityTypes : extractEntityTypes,
  extractFirstEntityType : extractFirstEntityType
};