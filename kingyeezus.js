'use strict';

var fs = require('fs'),
  Twit = require('twit'),
  dotenv = require('dotenv');

dotenv.load();


function Yeezus() {
  Yeezus.prototype.kanye = JSON.parse(fs.readFileSync('./data/slist.json', 'UTF-8'));
  this.bVerses = JSON.parse(fs.readFileSync('./data/bible.json', 'UTF-8'));
  this.T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });
}

Yeezus.prototype.tweet = function() {
  var verse = this.getVerse();

  this.T.post('statuses/update', { status: verse }, function(err, data, res) {
    if(err) { console.log('error sending tweet:', err); return false; }
    console.log('tweet sent:', verse);
    return true;
  });
};

Yeezus.prototype.cleanVerse = function(verse) {
  return verse.replace(/"/g, '').replace(/\./g, '').replace(/'/g, '').replace(/,/g, ' ').replace(/!/g, '');
};

Yeezus.prototype.newVerse = function(verse) {
  var matchWord = this.getMatchWord(verse);
  var bVerse = this.getBibleVerse(matchWord.toLowerCase());
  var kParts = verse.split(matchWord);
  var bParts = bVerse.split(matchWord.toLowerCase());

  if(!matchWord || bVerse === '' || !kParts[1] || !bParts[1]) { return this.getVerse(); }

  var end = bParts.slice(1).join('').trim();
  var start = bParts.slice(0,1).join('').trim();
  start = [start[0].toUpperCase(), start.slice(1)].join('');


  if(Math.round(Math.random()) % 2 === 0) { //.replace(/  /g, '');
    return (start +  matchWord + kParts[1].trim());
  } else {
    return (kParts[0].trim() +  matchWord + end);
  }
};

Yeezus.prototype.cleanWord = function(word) {
  return (word) ? word.replace(/,/g,'').replace(/'/g,'') : '';
};

Yeezus.prototype.getMatchWord = function(verse) {
  var yeezus = this;
  var parts = verse.split(' ');
  var halflen = Math.round(parts.length/2);
  // var middleWord = parts[halflen];
  // var randIdx = Math.floor(Math.random() * parts.length);
  // if(randIdx < 3) { randIdx = 3; }

  var middleWord = parts[halflen];
  var lenTest = function(word, i) {
    if(word.length <= 4 && i === 1) {
      return lenTest(yeezus.cleanWord(parts[halflen + i]), -1);
    } else if (word.length <= 4 && i === -1) {
      return ' ' + middleWord + ' ';
    }
    return ' ' + word + ' ';
  };

  return lenTest(yeezus.cleanWord(middleWord), 1);
};

Yeezus.prototype.getBibleVerse = function(word) {
  var matches = this.bVerses.filter(function(verse) {
    return verse.toLowerCase().indexOf(word) !== -1;
  });

  var randChoice = Math.floor(Math.random() * matches.length);
  return (matches[randChoice]) ? matches[randChoice].toLowerCase() : '';
};

Yeezus.prototype.getVerse = function() {
  var verse = this.cleanVerse(this.kanye[Math.floor(Math.random() * this.kanye.length)]);
  var finalVerse = this.newVerse(verse).replace(/  /g, ' ');
  if(finalVerse.length > 140) {
    return this.getVerse();
  }
  return finalVerse;
};

module.exports = Yeezus;
