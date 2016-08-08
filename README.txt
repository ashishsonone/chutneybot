Directory structure:
app/api : backend server code
app/tests : tests for backend
app/web : frontend chat UI

To run tests:
  mocha tests --recursive --watch

To view conversation logs:(in mongo shell)
  use chutney;
  db.logs.find({}, {input : true, nodesVisited : true, sessionId : true, _id : false, context : true});
  db.sessions.find({}, {sessionId : true, count : true})

