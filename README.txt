Directory structure:
app/api : backend server code
app/tests : tests for backend
app/web : frontend chat UI

To run tests:
  mocha tests --recursive --watch

To view conversation logs:(in mongo shell)
  use chutney;
  
  //view logs
  db.logs.find({}, {input : true, nodesVisited : true, sessionId : true, _id : false, context : true});
  
  //view sessions
  db.sessions.find({}, {sessionId : true, count : true})

  //remove sessions with no conversation
  db.sessions.remove({count : {$lte : 1}})
  
  
To take dumps of db regularly:
  mongodump --db chutney --out d1/