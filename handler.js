'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES();

module.exports.createContact = async (event) => {
  console.log('Recieved:::', event);
  const { to, from, subject, mesage } = JSON.parse(event.body);

  if(!to || !from || ! subject || !mesage) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: " to or from... are not set properly"})
    }
  }

  const params = {
    Destination: {
      ToAddress: [to]
    }, 
    Message: {
      Body: {
        Text: { Data: message }
      },
      Subject: { Data: subject}
    },
    Source: from
  }

  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({message: "email sent sucessfully", success: true}),
    }
  } catch(error) {
      console.error(error);
      return {
        statusCode: 400,
        body: JSON.stringify({message: "Email failed to send", success: true}),
      }
  }

};
