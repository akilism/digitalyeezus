'use strict';

/**
 * Created by akil.harris on 12/4/13.
 */

var port = process.env.PORT || 8088;
var env_mode = process.env.NODE_ENV || 'dev';
var express = require('express'),
  request = require('request'),
  url = require('url');
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
    handlePost(request, response);
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
    handlePost(request, response);
  });
}

var handlePost = function (req, res) {
  var message = req.query.message;
  var send = function (reply) {
    res.json({'reply': reply});
  };
  console.log('message:', message);
  getReply(message, send);
};

var getReply = function (message, cb) {
  var postvals = {
    'message': message
  };

  request.post('http://ec2-54-191-116-132.us-west-2.compute.amazonaws.com:8088/yeezus',
    { form: postvals },
    function (error, response, body) {
      if (error) { console.log(error); }
      if (!error && response.statusCode === 200) {
        console.log('reply: ', JSON.parse(body).reply);
        cb(JSON.parse(body).reply);
      }
    });
};


server.listen(port);
console.log('Listening on port ' + port + '.');
