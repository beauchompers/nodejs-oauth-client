# OAuth 2.0 Client App

This is an example OAuth 2.0 Client App to demo 3rd party authorization flow.  Basically we login with a server to grant that service consent, obtain an auth code, and then pass this auth code to a backend server which then retrieves an access token and calls APIs for us. 

Idea behind this was to keep the Access Token off the client and on the backend server, as the token is used for a 3rd party API.  

## OAuth 2.0 Server App
This app works hand in hand with the [OAuth 2.0 Server](https://github.com/beauchompers/nodejs-oauth-server)

## Setup Instructions

Make sure you have Node JS installed, and then run npm install to bring down the required packages.

## Running the App

You can run the app using nodemon, or use the command:

```
node ./bin/wwww
```
