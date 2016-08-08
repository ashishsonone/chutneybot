"use strict"
function pickRandomArrayItem(array){
  var len = array.length;
  var x = Math.floor(Math.random()*len);
  return array[x];
}

module.exports = {
  pickRandomArrayItem : pickRandomArrayItem
};