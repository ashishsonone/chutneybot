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
How to sync local and remote db

#scripts in 'app/scripts' folder

#Take dumps of db and scp to remote: 
python dump_scp.py

#restore the local mongodb backup on remote using restore.sh script
./restore.sh  <backup-folder-name>