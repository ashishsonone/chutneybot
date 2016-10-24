'use strict'

var nodemailer = require('nodemailer');
var util = require('util');
var generalConfig = require('../config/general');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtp://ashishsonone@hotmail.com:Microsoft%400@smtp.live.com:587');

var jobHtmlTemplate = "Name : %s<br>" 
    + "Position : %s<br>"
    + "Branch : %s<br>"
    + "Email : %s <br>"
    + "Phone : %s <br>"

function sendMail(to, subject, text){// setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'ashishsonone@hotmail.com', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plaintext body
      html: text // html body
  };

  console.log('[Mailer] : transporter request made');
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('[Mailer] Message sent: ' + info.response);
  });
}

function sendCandidateApplicationMail(context){
  var subject = "[Bot] Job Application";
  
  var html = util.format(jobHtmlTemplate, context.name, context.position, context.branch, context.email, context.phone);
  sendMail(generalConfig.mailAddress, '[Bot] Job Application', html);
};

module.exports = {
  sendMail : sendMail,
  sendCandidateApplicationMail : sendCandidateApplicationMail
};

//usage
//sendMail('ashishsonone009@hotmail.com', 'Hi this is ashish');