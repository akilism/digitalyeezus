var Twit = require('twit');

var T = new Twit({
  consumer_key: 'yt8JrzuVcXaC2bP5v7yIOR5j4',
  consumer_secret: '8bJqwQvjuHyzBbDBNJlIL2kZlwEpRXWGPLA576pbPsfUscBoG0',
  access_token: '3045654005-Uk5F20Wt31B2YF0krR0qXoQHbnLvlRYlxqUrIwS',
  access_token_secret: 'dulTbDAvniGWFKuh6Csakghe8Sj0y2z97EkQYUjBUQsgF'
});

T.get('statuses/user_timeline', { screen_name: 'kanyewest' },  function (err, data, res) {
  T.get('statuses/retweets', { id: data[0].id_str }, function(tweetErr, tweetData, tweetRes){
    console.log(tweetData);
  });
  // data.map(function(tweet) {
  //   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  //   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  //   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  //   console.log(tweet);
  //   // T.get('statuses/show', { id: tweet.id }, function(tweetErr, tweetData, tweetRes){
  //   //   console.log(tweetData);
  //   // });
  // });
});

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
