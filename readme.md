# Moon Mood

An SMS-based mood tracking application

## Local Setup

```
$ git clone https://github.com/jshawl/moon-mood.git
$ cd moon-mood
$ npm install
$ nodemon
```

## Receiving SMSs

This application receives webhooks from the Twilio API.

### Create a new messaging service

Visit https://www.twilio.com/console/sms/dashboard and click "Create a Messaging Service"

Under "Inbound Settings", provide the deployed url for this application.

If you'd like to just tinker, consider creating a [restful link](http://restful.link)