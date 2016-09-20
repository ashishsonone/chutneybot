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
  

- - - - - -
How to sync local and remote db:

#Take dumps of db regularly:
folder=2016-09-19-18-00
mongodump --db chutney --out $folder

#copy over to remote folder 2016-09-19-18-00
scp -r -i ~/Documents/AWS/estest.pem $folder $myEC2:~/Downloads/

#ssh to remote
ssh -i estest.pem $myEC2

#restore:
folder=2016-09-19-18-00
mongorestore --db chutney 2016-09-19-18-00/chutney/