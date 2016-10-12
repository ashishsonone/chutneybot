var NewsModel = require('../models/news').model;

function getNews(){
  var promise = NewsModel.find({}, {
    _id : false,
    updatedAt : false,
    createdAt : false,
    __v : false
  })
  .sort({date : -1})
  .limit(5)
  .exec();
  
  return promise;
}

module.exports = {
  getNews : getNews,
};