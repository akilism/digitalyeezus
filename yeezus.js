'use strict';

/**
 * Created by akil.harris on 12/4/13.
 */

var express = require('express'),
    url = require('url'),
    request = require('request'),
    dotenv = require('dotenv'),
    handlers = require('./handlers.js');

dotenv.load();

var port = process.env.PORT || 8088;
var env_mode = process.env.NODE_ENV || 'dev';
var app = express();
var server = require('http').createServer(app);

console.log(env_mode);
console.log(__dirname);
console.log(process.cwd());
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
  app.get('/reply', function (request, response) {
    handlers.reply(request, response);
  });
}

if (env_mode === 'production') {
  app.use(express.static('dist'));
  app.use(express.json());
  app.use(express.urlencoded());
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

  app.get('/reply', function (request, response) {
    handlers.reply(request, response);
  });
}

server.listen(port);
console.log('Listening on port ' + port + '.');
