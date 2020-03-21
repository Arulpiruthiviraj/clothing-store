// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const axios = require('axios');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 const {google} = require('googleapis');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
//calendar appointment
// Enter your calendar ID below and service account JSON below
const calendarId = "t8sajm44bfctknpqdoh9n6ktpc@group.calendar.google.com";
const serviceAccount ={
  "type": "service_account",
  "project_id": "eventdetails-vjnvnr",
  "private_key_id": "1997a09fe9573c02acec2d51a30cd4b2ee23e8e0",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCrWWQERRBtSjLX\n8JmXHc9rZOpSPJUB5iEouJZHxOAHGicip8783SuVUapanXIA9SvOyit5qdRbffK1\ng5r8OvzIjAWjgl60sZwic/sRveHOrFlImTAkDasek+HNDt4yWzldhWmLcVFZQyle\nOXthQRoarLL08D0c4ygzZrn9trTa70mMBX4dGbCf64HSkVdwyvP2LxYGMzweCeKJ\nymdBP0lmBhpGD+lHMGW90XHLL50QVDggUHJ7QJlaJUvjRcdZXD9AyBSySvkQG/Ir\nw6INpccmqj8P7yczBYyCWvh7qjtTY6uFEaieaolS//1J8hjSmutpgVOF3YFNtCby\nlp85gNQVAgMBAAECgf8p5TKmiSmFxs8h/pRjDTHpn2jcyBBFvjwN3MNk+hIBmONn\ntfcLWDSibe/JhlHrPUIsiC3Tu8TK7UBNJRnj7OqsvS1g7qwo6YXoEsWMddtEBMz+\ncK2jcoVy9miUaWciLPMeexl+1Hmax/3feRBDYhw7vy4HaeIhPcuy4/U4kl7gBBBv\nwKKjv/9kSULi5k7r3vApScpJk8bBcWNx+bpkheRTlV7RRJZ6OZbhplm9laW0/TFV\nBoAOTJF3yv8mGoNtcmeCAArppQX2ePNbbytHdRM9k9H8zsmlFoZ4DI+9NWymf/16\nGVAUAWZb0gsIiCoUdVA/Nqd0IbeCGe1Kmx5vYOECgYEA2xWmPCCte4WlcFqZf5I9\n2LADAk2MVHaCrMksTFbJB7vR4BRlvoVPF/86BC1aYNPuNmYMLIJ62Tsr/mBIvZT8\nUoU+wRWs6S0SYz2ktTzXlsn2GssnR+Hrmo3z9WLNPgNzOj3736pia2b6TzTrwuuX\nM20N0/nTQyu6ibYqm/HluEUCgYEAyDilPLxR8sM5wc5tJmZQy+I7qv/KMZKlLH+8\nabJShSYWw0R7DChb3iCOVwQ8AudIgi6XR8PXMa+29jr8SLNXb3Yd+kh7jMh7B18k\n0liQYQY2YEseA6T6ldSjeF+0LXItJTSrTP0vtyxJgRZE9djIXjek5ArlboSiXDd4\n7mkpcZECgYBRI6N9gVy+8rBi/Cr9ZFwjdIyova/LWFjtRVRysXGiu5zvMJ6+AQFa\nEdyaz3E5i0QeQY0grvJwocmZXG+URylsJo0nVa/EbDzzJFFsDiyKXCIZqkPSC4oG\no6xGpWD+Jqj2WR5/p8rrnCf4TdFDT52gHjOQ3mWv6vIbLqx5NQ2vQQKBgDIj3V1k\nW7FLqn8aTsM7BCjKst6Tx/K6IpsOMgTWH0wwyaqEz7uvr7HkvUCVUuH3QXU4bbIP\nHSjYNB1dkCg0oUTMc51l4WrUGdsyvGngu+dQQvXCWfXXrtkusvFGJjzrRtr2YZ+a\nGATrFk05YnOeoi7WCHkDMYmHtZEaYzJxK2vBAoGBALEO8MUtI6liee8OBXmKejdJ\nU83nl5pjV3BYxlsokgko6lD3whhe+52K6wSXgPm6izwgSDzoFSNCfXnFhUVK9Da2\nb2I+QsNI6xwhgMQ/v/amW/H9dADlHe/mPw6XN/HHoqHx9vtMlN3GhCWKTOMB0wlO\nzBm9hbxNmquZzZ5kZ/Vv\n-----END PRIVATE KEY-----\n",
  "client_email": "eventdetails@eventdetails-vjnvnr.iam.gserviceaccount.com",
  "client_id": "109544518378602034158",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/eventdetails%40eventdetails-vjnvnr.iam.gserviceaccount.com"
};
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
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 // making appointment
  
   console.log("Parameters", agent.parameters);
  const appointment_type = agent.parameters.AppointmentType
  function makeAppointment (agent) {
    // Calculate appointment start and end datetimes (end = +1hr from start)
    console.log("Parameters", agent.parameters.date);
    const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0] + timeZoneOffset));
    const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
    const appointmentTimeString = dateTimeStart.toLocaleString(
      'en-US',
      { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
    );

    // Check the availibility of the time, and make an appointment if there is time on the calendar
    return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type).then(() => {
      agent.add(`Ok, let me see if we can fit you in. ${appointmentTimeString} is fine!.`);
    }).catch(() => {
      agent.add(`I'm sorry, there are no slots available for ${appointmentTimeString}.`);
    });
  }
  
  
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function eventQnHandler(agent,auth) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      console.log(response,events)
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
  }
//   function eventQnHandler(agent){
//     const word=agent.parameters.event;
//     return axios.get(`https://www.googleapis.com/calendar/v3/calendars/raweinfoyqg@gmail.com/events?key=AIzaSyDvm9MSFDhJA9bF7BWHjNYlHkkjPMjCLTg`)
//       .then((result)=>{
//     result.data.items.map(eventObj=>{
//       if(eventObj.summary){
//     agent.add(eventObj.summary);
//       }
//     });
//     });
//   //agent.add('intent called'+word);
//   }
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  //calendar 
    intentMap.set('Schedule Appointment', makeAppointment);

  
  intentMap.set('event', eventQnHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

function createCalendarEvent (dateTimeStart, dateTimeEnd, appointment_type) {
  return new Promise((resolve, reject) => {
    calendar.events.list({
      auth: serviceAccountAuth, // List events for time period
      calendarId: calendarId,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
      // Check if there is a event already on the Calendar
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('Requested time conflicts with another appointment'));
      } else {
        // Create event for the requested time period
        calendar.events.insert({ auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {summary: appointment_type +' Appointment', description: appointment_type,
            start: {dateTime: dateTimeStart},
            end: {dateTime: dateTimeEnd}}
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        }
        );
      }
    });
  });
}
