//contact branches
var tree = {
  "contact.name" : {
    id : "contact.name",
    condition : function(session){
      return true;
    },
    
    reply : function(session){
      session.context['name'] = session.state.input;
      return {
        reply : "And your phone number please",
        suggestions : ["8976208510", "+022-23423348"]
      }
    },
    
    child : "contact.number",
    stop : true,
    sibling : null
  },
  
  "contact.number" : {
    id : "contact.number",
    condition : function(session){
      return true;
    },
    
    reply : function(session){
      session.context['number'] = session.state.input;
      return {
        reply : "Thank you " + session.context.name + ", a human from our side will call you soon. What else do you want to know?",
        suggestions : ["how can you help me", "show your best work", "work done for flipkart", "your top clients"]
      }
    },
    
    child : null,
    stop : true,
    sibling : null
  },
}

module.exports = {
  tree : tree
};