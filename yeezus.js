'use strict';

/**
 * Created by akil.harris on 12/4/13.
 */

var port = process.env.PORT || 8088;
var env_mode = process.env.NODE_ENV || 'dev';
var express = require('express'),
    url = require('url'),
    handlers = require('./handlers.js');
var app = express();
var server = require('http').createServer(app);

console.log(env_mode);
/**********************
 **      ROUTES      **
 **********************/

if (env_mode === 'dev') {
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/.tmp'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router);
  app.get('/', function (request, response) {
    response.sendfile(__dirname + '/app/index.html');
  });
  app.post('/yeezus', function (request, response) {
    handlers.handlePost(request, response);
  });
  app.get('/tweet', function (request, response) {
    handlers.sendTweet(request, response);
  });
}

if (env_mode === 'production') {
  app.use(express.static(__dirname + '/dist'));
  //app.use(express.static(__dirname + '/.tmp'));
  app.use(app.router);
  app.get('/', function (request, response) {
    response.sendfile(__dirname + '/dist/index.html');
  });
  app.post('/yeezus', function (request, response) {
    handlers.handlePost(request, response);
  });
  app.get('/tweet', function (request, response) {
    handlers.sendTweet(request, response);
  });
}

server.listen(port);
console.log('Listening on port ' + port + '.');
