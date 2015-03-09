'use strict';

var Twit = require('twit'),
  request = require('request'),
  dotenv = require('dotenv'),
  redis = require('redis'),
  rClient = redis.createClient();

dotenv.load();

var mentionBot = (function() {
  var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  var checkForReply = function(tweetId) {
    return new Promise(function(resolve, reject) {
      rClient.sismember('repliedTweets', tweetId, function(err, res) {
        if(err) { reject(err); }
        else { resolve((res === 1)); }
      });
    });
  };

  var postReply = function(isRepliedTo, tweetId, reply, username) {
    return new Promise(function(resolve, reject) {
      if(isRepliedTo) { resolve(false); }
      else {
        var message = ('. ' + username + ' ' + reply).slice(0,140);

        T.post('statuses/update', { status: message, in_reply_to_status_id: tweetId }, function(err, data, res) {
          if(err) { reject(err); }
          else { resolve(true); }
        });
      }
    });
  };

  var saveToDataStore = function(wasPosted, tweet, reply) {
    return new Promise(function(resolve, reject) {
      if(!wasPosted) { resolve(false); }
      else {
        rClient.hmset(tweet.id, {
          'date': Date.now(),
          'reply': reply,
          'text': tweet.text,
          'userid': tweet.user.id,
          'username': tweet.user.username
        }, function(err, res) {
          if(err) { console.log(err); }
        });

        rClient.sadd('repliedTweets', tweet.id, function(err, res) {
          if(err) { reject(err); }
          else { resolve((res === 1)); }
        });
      }
    });
  };

  var logTweetAndResponse = function(tweet, reply) {
    var tweetDetails;
    return checkForReply(tweet.id).then(function(isRepliedTo) {
      // console.log('isRepliedTo:', isRepliedTo);
      return postReply(isRepliedTo, tweet.id, reply, '@'+tweet.user.screen_name);
    }).then(function(wasPosted) {
      // console.log('wasPosted:', wasPosted);
      return saveToDataStore(wasPosted, tweet, reply);
    }).then(function(isSaved) {
      // console.log('isSaved:', isSaved);
      if(isSaved) {
        tweetDetails = `
  ------------------
  New Reply:
  Tweet ID: ${tweet.id}
  User ID: ${tweet.user.id}, Username: ${tweet.user.name}, Screenname: ${tweet.user.screen_name}
  User Text: ${tweet.text}
  Yeezus Reply: ${reply}`;
        return tweetDetails;
      }

      tweetDetails = `
  ------------------
  Previously replied to:
  Tweet ID: ${tweet.id}
  User Text: ${tweet.text}`;
      return tweetDetails;
    }).catch(function(err) {
      console.log('error:', err);
    });
  };

  Function.prototype.curry = function() {
    var that = this;
    var slice = Array.prototype.slice;
    var args = slice.call(arguments);
    return function() {
      return that.apply(this, args.concat(slice.call(arguments)));
    };
  };

  var getReply = function (message, cb) {
    var postvals = {
      'message': message
    };

    return new Promise(function(resolve, reject) {
      request.post('http://ec2-54-191-116-132.us-west-2.compute.amazonaws.com:8088/yeezus',
      { form: postvals },
      function (error, response, body) {
        if (error) { reject(error); }
        if (!error && response.statusCode === 200) {
          // console.log('reply: ', JSON.parse(body).reply);
          resolve(cb(JSON.parse(body).reply));
        }
      });
    });
  };

  var kanyeMentions = function() {
    T.get('search/tweets', {q: '-http -t.co -#NowPlaying @kaynewest', result_type: 'recent', count: 15}, function(err, data, res) {
      if(err) { console.error('error:', err); return; }
      data.statuses.map(function(tweet) {
        var re = /@[a-z0-9_]{1,16}/gi;
        tweet.text_no_mentions = tweet.text.replace(re, '').trim();
        return tweet;
      }).filter(function(tweet, i) {
        return ((tweet.text_no_mentions !== '' && tweet.text.indexOf('RT ') === -1 && tweet.text.indexOf('http') === -1));
      }).forEach(function(tweet) {
        var logTweet = logTweetAndResponse.curry(tweet);
        getReply(tweet.text_no_mentions, logTweet).then(function(result) {
          console.log(result);
        });
      });
    });
  };

  return {
    kanyeMentions:kanyeMentions
  };

})();

module.exports = mentionBot;
