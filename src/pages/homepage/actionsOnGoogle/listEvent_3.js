'use strict';

 const functions = require('firebase-functions');
 const {google} = require('googleapis');
 const {WebhookClient} = require('dialogflow-fulfillment');
 
 // Enter your calendar ID below and service account JSON below
 const calendarId = "bkpdd03ot9tmqnugfu595dmgg0@group.calendar.google.com";
 const serviceAccount = {
    "type": "service_account",
    "project_id": "listevents-dhacea",
    "private_key_id": "072c7a9ab3c85e7862687974225e6cc57a345d7b",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCu5PrpnEnnw7G6\n9sXGH27KnEebXpZVblWmtWCNoYclw1kXsY6HhDoxAc9zCh9O0J68XyWeIkJC+zN5\nT9FLJVXao93qM4ckZiT9cvusiPFfOcQS0u9xJioVydFBpcdXR1du2+I1IduSzus6\nKyjtijZMmz0tvF/I71hOLHPJxFFMUF02dVkg9aWjfT0R5l5hQLnIt85Nuuuhtns7\nKofFRyreeLmf/9xoYH96G1hHY9wAKy7OLC9cpQBfT9z+c/x42I0ZeNrsyqhhFA6w\n7KHE0C+d0zJKf0zIY3tUoQ0jZm5QCJyoNKJD2Zfkp+lxGnqE6eESwBMLU+jnJBN1\nmmJyHGVPAgMBAAECgf8EyD4UJTHgJHm3owfFYxakc6GBnhR+QYYWCN+a/8+yOKU3\nAKPlELiGnoYNnzk77nhorjFZIZauPjAqIQSYCW1PjSuEO+R2GlTomTxIe3YeJHY4\nDYx+i4ybC+ms4duRh2HcpiaJTWOzn/TOol98H0tczOHfXkdAN0sy2ARSgAu5Cm3p\n5JkoNQb7C+bJ+WdQkoJ6cN0ZycQcDu2XX8Zt3lI/qwMRa3NmwKOHcgSlF1S0tTDR\ndHZA4de8IwfxQORSdA+f8P3G5d/aOChQH9wrSxNJIdXFCoOhJmDeBcHAj8FfxfDw\n+EEONr4H8PNNPM43Ey8KbhaJBHzaQy6UtJxbV4kCgYEA4Uf14UGBabH+AfIqpj8w\n5MZeGWHa82jwf1DBbZXRNqEsBPktlgM1ouJ0yMJdavzg++OJHrYmZRfiOtCWJn0Q\nl3vaW6IPUnV6P0k1yGcEGHoiveU1N8wnA1t6f3pfy2AhYnOOGsN9/FZQkQKnGJ92\nfVu78lPiErvumiaUMglCEy0CgYEAxr4jmp1tfjfxQSRG9rU60yi66kHARRqgCLrJ\naoWjps/6B3J2KF27rbkk1Vx1Cri7sfeY0iwx8my/ViN2LqYDF1RjZQWjg58HKaaL\n8zOelECsCkU/s1Gp5Q8PunjPgLgARKWfYgGHkpnqT4wmUVeJX3v/ayFMbTRYyC6R\nd0YC1+sCgYB1rLoR/L6VsETnTVDb4BwxFDEo/wV4qfMd/dfb3ysWZx/wRRx7xJdq\nyvGHwIc9kHQQ/yyr3ye1HMGuSTB1UFSvXCGWRdPNFdJSZnJyiOUJyBqHqMegqsIi\nLdGR7yFEwaUOoR+0eTNA8PFKneEcqochOh61mP15HbOnz8kPTei2zQKBgFEEWcdB\nvcziSTrg6vzPTDegNvIf8504CV0Fp+4ApIHv7mDyzDAQZd2fx+AiXKQOQpV99ZJX\n6dSFeEpJEnhZvJDaGdqovct+HJFiD1MJC/ArnPZi3GDhPXze8u51KUGzwIg7bAmr\nzfR5QgdDfqtSH/IIvkqRvHIYEMkqEqqoo6gZAoGASeF/PcxlGU/LJARVc5hk1XBe\ncYfRaFkZkWFxmPSGc/j/uKgCpEF+DVrVxK79C9+wAiSOsfoq95J1xBoOYsomPNm7\nUxDISM4CstizyxbtFvIVvAOUjOUs5FA41SpQe/Gqao4rxCy+LRnmJ9UFHcQ3nSms\n1h36D3iv7fNNLsciFyU=\n-----END PRIVATE KEY-----\n",
    "client_email": "listevents@listevents-dhacea.iam.gserviceaccount.com",
    "client_id": "102810729166733571147",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/listevents%40listevents-dhacea.iam.gserviceaccount.com"
  }; // Starts with {"type": "service_account",...
 
 // Set up Google Calendar Service account credentials
 const serviceAccountAuth = new google.auth.JWT({
   email: serviceAccount.client_email,
   key: serviceAccount.private_key,
   scopes: 'https://www.googleapis.com/auth/calendar'
 });
 const calendar = google.calendar('v3');
 process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
 
 const timeZone = 'America/Los_Angeles';
 const timeZoneOffset = '-07:00';
 
 exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
   const agent = new WebhookClient({ request, response });
   //const appointment_type = agent.parameters.AppointmentType;
   function makeAppointment (agent) {
     // Calculate appointment start and end datetimes (end = +1hr from start)
     //const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0] + timeZoneOffset));
     //const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
     //console.log(dateTimeStart+"hey hello");
     //const appointmentTimeString = dateTimeStart.toLocaleString(
     //  'en-US',
      // { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
    // );
 
     // Check the availibility of the time, and make an appointment if there is time on the calendar
     //return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type).then(() => {
     //  agent.add(`Ok, let me see if we can fit you in. ${appointmentTimeString} is fine!.`);
     //}).catch(() => {
     //  agent.add(`I'm sorry, there are no slots available for ${appointmentTimeString}.`);
     //});
     
     //additional
       const userAskedDate=agent.parameters.date?agent.parameters.date.split('T')[0]:agent.parameters['date-period'].startDate;
     console.log(agent.parameters['date-period'].startDate);
      return listEvents(userAskedDate,agent).then((value)=> {
         value.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
           agent.add(`Events are ${start} - ${event.summary} `);
           agent.add(`Would you like to make an appointment? (Yes/No)`);
           console.log(`${start} - ${event.summary}`);
      });
     }).catch(() => {
       agent.add(`I'm sorry, there are no slots available for }.`);
     });
   }
 
   let intentMap = new Map();
   intentMap.set('AskToListEvents', makeAppointment);
   agent.handleRequest(intentMap);
 });
 
 function listEvents(userAskedDate,agent) {
   return new Promise((resolve, reject) => {
  calendar.events.list({
    auth: serviceAccountAuth, // List events for time period
    calendarId: 'raweinfoyqg@gmail.com',
    timeMin: (new Date(userAskedDate)).toISOString(),
    maxResults: 1,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    resolve(res.data.items);
  });
   });
}
 
