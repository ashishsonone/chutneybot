#to be used on remote machine
#usage ./restore.sh <db name> <backup-folder-path>
#e.g ./restore.sh chutney ./2016-09-19-18-00
if [ "$#" -lt 1 ]; then
    echo "usage : ./restore.sh <db name> <backup-folder-path>"
    echo "e.g ./restore.sh chutney ./2016-09-19-18-00/chutney"
    exit
fi

db=$1
folder=$2
datafolder=${folder%/} #remove trailing slash if any

echo $datafolder

#mongo chutney --eval "db.clients.drop(); db.people.drop(); db.work.drop(); db.awards.drop(); db.contacts.drop();"
mongorestore --collection clients --db $db $datafolder/clients.bson
mongorestore --collection work --db $db $datafolder/work.bson
mongorestore --collection people --db $db $datafolder/people.bson
mongorestore --collection awards --db $db $datafolder/awards.bson
mongorestore --collection contacts --db $db $datafolder/contacts.bson
mongorestore --collection responses --db $db $datafolder/responses.bson
mongorestore --collection cases --db $db $datafolder/cases.bson
mongorestore --collection news --db $db $datafolder/news.bson