var express = require('express');
var router = express.Router();
var request = require('request');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('oauth2.properties');

// grab properties from the oauth2.properties file.
var client_id = properties.get('main.client_id');
var token_host = properties.get('main.token_host');
var token_path = properties.get('main.token_path');
var authorize_path = properties.get('main.authorize_path');
var callback_url = properties.get('main.callback_url');

// Set the configuration settings
// for client app we do not require the client secret, that's only exposed to the server app
const credentials = {
  client: {
    id: client_id,
    secret: 'thissecretistotallyinvalid'
  },
  auth: {
    tokenHost: token_host,
    tokenPath: token_path,
    authorizePath: authorize_path
  }
};

// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2').create(credentials);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OAuth2.0 Client App' });
});

/* GET home page. */
router.get('/auth', function(req, res, next) {
  // Authorization oauth2 URI
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: callback_url,
  scope: ['whiskey','tango','foxtrot'] // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
});

console.log("redirect uri is " + authorizationUri);
res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and passing it to the backend API
router.get('/callback', function(req, res, next) {
  const options = {
    url: backend_server,
    form: {
      code: req.query.code
    }
  };

  // call the OAuth2 server with the code, and get back a username 
  // OAuth2 server exchanges auth code for OAuth token then calls an endpoint to obtain the authenticated user name
  request.post(options, function(err, response, body) {
    if (err) {
      res.render('index', { title: 'Authentication Failed!', guest: 'Error' });
    } else {
    var json = JSON.parse(body);
    var status = res.statusCode;
    console.log(json);
    if (status == '200') {
      console.log('User is' + json);
      res.render('index', { title: 'Authentication Success!', user: json });
    } else {
      console.log('No User!');
      res.render('index', { title: 'Authentication Failed!', user: 'Error' });
    }
  }
  });
});

module.exports = router;
