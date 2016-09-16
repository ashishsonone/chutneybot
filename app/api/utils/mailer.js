'use strict'

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtp://ashishsonone@hotmail.com:Microsoft%400@smtp.live.com:587');

function sendMail(to, subject, text){// setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'ashishsonone@hotmail.com', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plaintext body
      html: text // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}

module.exports = {
  sendMail : sendMail
};

//usage
//sendMail('ashishsonone009@hotmail.com', 'Hi this is ashish');