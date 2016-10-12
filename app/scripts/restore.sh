#to be used on remote machine
#usage ./restore.sh <backup-folder-name>
#e.g ./restore.sh 2016-09-19-18-00

#note : assume that backup folder at ~/Downloads
cd ~/Downloads
folder=$1
echo $folder
#mongo chutney --eval "db.clients.drop(); db.people.drop(); db.work.drop(); db.awards.drop(); db.contacts.drop();"
mongorestore --collection clients --db chutney $folder/chutney/clients.bson
mongorestore --collection work --db chutney $folder/chutney/work.bson
mongorestore --collection people --db chutney $folder/chutney/people.bson
mongorestore --collection awards --db chutney $folder/chutney/awards.bson
mongorestore --collection contacts --db chutney $folder/chutney/contacts.bson
mongorestore --collection responses --db chutney $folder/chutney/responses.bson
mongorestore --collection cases --db chutney $folder/chutney/cases.bson