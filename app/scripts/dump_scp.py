#to be used on local machine
#usage : python dump_scp.py

#note : $myEC2 env variable already set to remote host 'ubuntu@ec2-52-66-116-94.ap-south-1.compute.amazonaws.com'
#note : ssh key for remote key store in ~/Documents/AWS/estest.pem

#what id does:
#creates a backup-folder named yyyy-mm-ddThh-mm
#copies it over to ~/Downloads folder of remote machine
#prints the backup folder name to be used with restore.sh script on remote machine

import os
from datetime import datetime
folder = datetime.now().strftime('%Y-%m-%dT%H-%M')
os.system("mongodump --db chutney --out " + folder)
#os.system("scp -r -i ~/Documents/AWS/estest.pem " + folder + " $myEC2:~/Downloads/")
print("backup folder = " + folder)
