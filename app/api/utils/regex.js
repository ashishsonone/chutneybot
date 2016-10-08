function prepareTemplate(str, reqDict){
  //x = 'Hi I am {me}, how are you {you}';
  
  //replace {me} => %(me)s as required by sprintf library
  //fill reqDict
  
  var template = str.replace(/\{([\w]+)\}/g, function(m, a){
    console.log(a);
    if(!reqDict[a]){
      reqDict[a] = 'null'
    }
    return '%(' + a + ')s';
  });
  
  return template;
}

module.exports = {
  prepareTemplate : prepareTemplate
}