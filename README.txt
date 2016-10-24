Directory structure:
app/api : backend server code
app/tests : tests for backend
app/web : frontend chat UI

To run tests:
  mocha tests --recursive --watch

- - - - - -
How to sync local and remote db

#scripts in 'app/scripts' folder

#Take dumps of db: 
python dump_scp.py

#restore the mongodb backup on using restore.sh script
./restore.sh <dbname> <backup-folder-name>
