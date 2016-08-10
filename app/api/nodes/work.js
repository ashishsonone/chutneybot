'use strict';

var workDb = require('../db/work');

function getCompanyWorkReply(companyEntities) {
  delete companyEntities.map["general"]; //remove general key
      
  var companies = Object.keys(companyEntities.map); //get other value of companies
  var company = companies[0];
  console.log("work.company node : %j", companies);


  var reply = [];
  if (company) {
    company = company.toLowerCase();
    console.log("company work %j", workDb.companies[company]);
  }

  if (!company) {
    reply.push({
      type : "text",
      value : "Here are our general best works"
    });

    reply = reply.concat(workDb.work["general"]);
  }
  else if (company && workDb.companies[company]) {
    reply.push({
      type : "text",
      value : "Here is our work for client " + company
    });

    reply.push({
      type : "cards",
      value : [
        workDb.companies[company]
      ]
    }); //push modifies original array and returns only NUMBER
  }
  else {
    reply.push({
      type : "text",
      value : "We haven't worked for " + company + " but look at our other works"
    });

    reply = reply.concat(workDb.work["general"]); //concat returns new array
  }
  
  return reply;
}

function getCategoryWorkReply(categoryEntities){
  var categories = Object.keys(categoryEntities.map);
  var category = categories[0];
  console.log("work.category " + category);
  category = category.toLowerCase();
  
  var reply = [];

  if(workDb.categories[category]){
    reply.push({
      type : "text",
      value : "Look at our finest work in " + category + " category"
    });

    reply = reply.concat(workDb.categories[category]);
  }
  else{
    reply.push({
      type : "text",
      value : "I don't have data for " + category + " category. Anyways have a look at our work from other categories. Or choose a category like : ads, social media, banner, website, etc like 'best work in social media'"
    });

    reply = reply.concat(workDb.work["general"]); //concat
  }
  
//  reply.push({
//    type : "text",
//    value : "I am not yet been trained to understand categories yet. Please come back sometime later. I might have evolved by then. pika... pika..."
//  });
  
  return reply;
}

var tree = {
  "work.root" : {
    id : "work.root",
    condition : function (session) {
      var entities = session.state.entities;
      return !(entities["company"] || entities["category"]); //no company entity
    },
    
    reply : function (session) {
      var reply = [{
        type : "text",
        value : "Here are our general best work"
      }];
      reply = reply.concat(workDb.work["general"]);

      return {
        reply : reply,
        suggestions : ["fmcg work", "how to contact"]
      };
    },
    
    child : null,
    stop : true,
    sibling : "work.company"
  },
  
  "work.company" : {
    id : "work.company",
    condition : function (session) {
      return session.state.entities["company"];
    },
    
    reply : function (session) {
      var companyEntities = session.state.entities["company"];
      
      var reply = getCompanyWorkReply(companyEntities);
      return {
        reply : reply,
        suggestions : ["how to contact"]
      };
    },
    
    child : null,
    stop : true,
    sibling : "work.category"
  },
  
  "work.category" : {
    id : "work.category",
    condition : function (session) {
      return session.state.entities["category"];
    },
    
    reply : function (session) {
      var categoryEntities = session.state.entities["category"];
      
      var reply = getCategoryWorkReply(categoryEntities);
      return {
        reply : reply,
        suggestions : ["how to contact"]
      };
    },
    
    child : null,
    stop : true,
    sibling : null,
  },
};

module.exports = {
  tree : tree
}