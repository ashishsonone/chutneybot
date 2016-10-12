function getType(item){
  if(typeof(item) == 'object'){
    if(item.constructor == Array){
      return 'array';
    }
    else{
      return 'object';
    }
  }
  return null;
}

function setCardType(object, cardType){
  if(!object){
    return null;
  }
  
  object = JSON.parse(JSON.stringify(object));
  
  var objectType = getType(object);
  
  if(objectType == 'array'){
    console.log('setCardType array');
    object = object.map(function(e){
      e._type = cardType;
      return e;
    });
  }
  else if(objectType == 'object'){
    console.log('setCardType object');
    object._type = cardType;
  }
  return object;
}

module.exports = {
  setCardType : setCardType
};