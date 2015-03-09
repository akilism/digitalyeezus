'use strict';

var request = require('request'),
    fs = require('fs'),
    Yeezus = require('./kingyeezus.js'),
    dotenv = require('dotenv');

dotenv.load();

var yeezusBot = new Yeezus();

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

exports.handlePost = function (req, res) {
  var message = req.body.message;
  var send = function (reply) {
    res.json({'reply': reply});
  };
  console.log('message:', message);
  getReply(message, send);
};

exports.sendTweet = function(req, res) {
  if(req.query && req.query.p === process.env.TWEET_WORD) { yeezusBot.tweet(); }
  res.json({'msg': 'Got my niggas in Paris and they going to carry it down to egypt.'});
};
