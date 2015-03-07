'use strict';

var fs = require('fs'),
  Twit = require('twit');


function Yeezus() {
  Yeezus.prototype.kanye = JSON.parse(fs.readFileSync('./data/slist.json', 'UTF-8'));
  this.bVerses = JSON.parse(fs.readFileSync('./data/bible.json', 'UTF-8'));
  this.T = new Twit({
    consumer_key: 'yt8JrzuVcXaC2bP5v7yIOR5j4',
    consumer_secret: '8bJqwQvjuHyzBbDBNJlIL2kZlwEpRXWGPLA576pbPsfUscBoG0',
    access_token: '3045654005-rQlRWr0WjEkJIyVCDO8DZ2UwRRnElYSG4hqOD2S',
    access_token_secret: 'rMPiPgU1zRLCp4SUvG33hkVSI3zDF0cPzzw4pZvnKEb8Q'});
}

Yeezus.prototype.tweet = function() {
  var verse = this.getVerse();
  // var newVerse =
  console.log('tweet sent:', verse);

  // this.T.post('statuses/update', { status: verse }, function(err, data, res) {
  //   if(err) { console.log('error sending tweet:', err); return false; }
  //   console.log('tweet sent:', verse);
  //   return true;
  // });
};

Yeezus.prototype.cleanVerse = function(verse) {
  return verse.replace(/"/g, '').replace(/\./g, '').replace(/'/g, '').replace(/,/g, ' ').replace(/!/g, '');
};

Yeezus.prototype.newVerse = function(verse) {
  var matchWord = this.getMatchWord(verse);
  if(!matchWord) { return verse; }
  var kParts = verse.split(matchWord);
  var bVerse = this.getBibleVerse(matchWord.toLowerCase());
  var endParts = bVerse.split(matchWord.toLowerCase());
  var end = endParts.slice(1).join('');

  if(bVerse === '') { return this.getVerse(); }
  return (kParts[0].trim() +  matchWord + end.trim()); //.replace(/  /g, '');
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
