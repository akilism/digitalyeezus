var Twit = require('twit'),
  request = require('request'),
  dotenv = require('dotenv');

dotenv.load();

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


T.get('search/tweets', {q: '-http -t.co -#NowPlaying @kaynewest', result_type: 'recent', count: 50}, function(err, data, res) {
  if(err) { console.error('error:', err); }
  data.statuses.map(function(tweet) {
    var re = /@[a-z0-9_]{1,16}/gi;
    tweet.text_no_mentions = tweet.text.replace(re, '').trim();
    return tweet;
  }).filter(function(tweet) {
    return (tweet.text_no_mentions !== '' && tweet.text.indexOf('RT ') === -1 && tweet.text.indexOf('http') === -1);
  }).forEach(function(tweet) {
    // console.log('-------------');
    // console.log(tweet);
    // console.log(tweet.id);
    // console.log(tweet.user.id, tweet.user.name, tweet.user.screen_name);
    // console.log(tweet.text);
    var tweetDetails = `
    ------------------
    Tweet ID: ${tweet.id}
    User ID: ${tweet.user.id}, Username: ${tweet.user.name}, Screenname: ${tweet.user.screen_name}
    Text: ${tweet.text}`;
    var logTweetAndResponse = console.log.curry(tweetDetails);
    getReply(tweet.text_no_mentions, logTweetAndResponse);
  });
  // if(data) { console.log('data:', data); }
});

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

  request.post('http://ec2-54-191-116-132.us-west-2.compute.amazonaws.com:8088/yeezus',
    { form: postvals },
    function (error, response, body) {
      if (error) { console.log(error); }
      if (!error && response.statusCode === 200) {
        // console.log('reply: ', JSON.parse(body).reply);
        cb(`
    Yeezus Reply: ${JSON.parse(body).reply}
    ------------------`);
      }
    });
};


// T.get('statuses/user_timeline', { screen_name: 'kanyewest', trim_user: true },  function (err, data, res) {
//   // if(err) { console.error('error:', err); }
//   // if(data) { console.log('data:', data); }
//   data.forEach(function(tweet) {
//     console.log('tweet id:', tweet.id_str);
//   });

//   T.get('statuses/show', { id: data[3].id_str, trim_user: true }, function(tweetErr, tweetData, tweetRes){
//     if(tweetErr) { console.error('tweetErr:', tweetErr); }
//     if(tweetData) { console.log('tweetdata:', tweetData); }
//     // if(tweetRes) { console.error('tweetRes:', tweetRes); }

//   });
// });

//find all the people who replied to kanyes last tweet.
//find their latest tweet send that to the api.
//reply with return value.

/*
var fs = require('fs');
var txt = fs.readFileSync('kjvdat.txt', 'utf8');

var reformatted = txt.split('\n').map(function(line) {
  return line.substr(line.indexOf(' ')+1).replace('~','').replace('\r','');
}).filter(function(line) {
  return line !== '';
});

fs.writeFileSync('bible.json', JSON.stringify(reformatted), 'utf8');
*/
