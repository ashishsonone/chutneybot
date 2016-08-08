/*
  mongoose with retry functionality
*/

"use strict"
var mongoose = require('mongoose');

//mongoose.set('debug', true);

var rsvp = require('rsvp').Promise;
mongoose.Promise = rsvp;

var attempting = true; //if attempting to connect, dont connectWithRetry on disconnect event

mongoose.suicide = false; //used when upgrading, we dont want to trigger connectWithRetry
                          //if we are ourselves calling mongoose.connection.close()
                          //in worker's 'disconnect' event set this to true

function connectWithRetry(url, poolSize){
  if(mongoose.suicide){
    console.log("connectWithRetry suicide=" + mongoose.suicide);
    return; //we are suiciding. So just return
  }

  if(url){
    mongoose.url = url;
  }
  if(poolSize){
    mongoose.poolSize = poolSize;
  }

  attempting = true;
  mongoose.connect(
    mongoose.url, 
    {
      server:{
        auto_reconnect:false, 
        poolSize : mongoose.poolSize
        //socketOptions: {connectTimeoutMS: 30000, socketTimeouMS : 15000} 
        //Need to understand how to actually set timetouts
      }
    }, 
    function(err){
      if (err) {
          console.log("(retry in 5s)connectWithRetry error %j", err);
          setTimeout(connectWithRetry, 5000);
      }
    }
  );
}

mongoose.connectWithRetry = connectWithRetry;

/*
 * mongoose.connection.readyState
 * Connection ready state
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

var db = mongoose.connection;
db.on('error', function() {
  console.log("db error");
});

db.on('connecting', function() {
  console.log("db connecting");
});

db.on('connected', function() {
  attempting = false;
  console.log("db connected");
});

db.on('disconnecting', function() {
  console.log("db disconnecting");
});

db.on('disconnected', function() {
  console.log("db disconnected attempting=" + attempting);

  if(!attempting){
      connectWithRetry();
  }
});

db.on('reconnected', function() {
  console.log("db reconnected");
});

module.exports = mongoose;