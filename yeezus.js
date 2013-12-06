/**
 * Created by akil.harris on 12/4/13.
 */

var port = process.env.PORT || 8088;
var express = require('express');
var app = express();
var url = require('url');
//var NA = require("nodealytics");
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**********************
 **      ROUTES      **
 **********************/

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/.tmp'));
app.use(app.router);
app.get('/', function (request, response) {
    console.log(__dirname + '/app/index.html');
    response.sendfile(__dirname + '/app/index.html');
});

app.get('/yeezusTalks', function (request, response) {

});

var getReply = function (data) {
  var yeezyQuotes = [
      'No sins as long as there’s permission',
      'It’s something that the pastor don’t preach',
      'I need a slow motion video right now',
      'Zero Zero Zero Zero, a whole lot of 0\'s',
      'Too close, you comatose so dope you overdose',
      'nigga you ain\'t up on this',
      'Ooh they so sensitive',
      'Did strippers not make an ark when I made it rain?',
      'It seems we living the American dream',
      'We shine because they hate us, floss cause they degrade us',
      'I say fuck the police, that\'s how I treat \'em',
      'act ballerific like it\'s all terrific',
      'Mayonnaise-colored Benz, I push miracle whips.',
      'My momma used to say only Jesus can save us',
      'Welcome to Sunday service if you hope to someday serve us',
      'Somebody ordered pancakes, I just sip the sizzurp',
      'Make music that\'s fire, spit my soul through the wire',
      'It\'s only two places you end up either dead or in jail',
      'Cause on judgment day, you gon\' blame me',
      'Look, you need to crawl \'fore you ball',
      'If my manager insults me again I will be assaulting him',
      'You are about to experience something so cold, man',
      'Cause ain\'t no tuition for having no ambition',
      'And ain\'t no loans for sitting your ass at home',
      'You know the kids gonna act a fool',
      'I\'m doing pretty good as far as geniuses go',
      'My face always looking like somebody stinks.',
      'I guess I should\'ve forgot where I came from',
      'Ooh they so sensitive',
      'Don\'t ever fix your lips like collagen',
      'Did strippers not make an ark when I made it rain?',
      'Aww man, you sold your soul',
      'They say I was the abomination of Obama’s nation',
      'Yeah I\'m talking business, we talking CIA',
      'If you fall on the concrete, that\'s your ass fault',
      'Let me know if it\'s a problem then, aight man, holla then',
      'Must be the pharaohs, he in tune with his soul',
      'And what I do, act more stupidly',
      'I had a dream I could buy my way to heaven',
      'Ooh they so sensitive',
      'So I parallel double parked that motherfucker sideways',
      'I know Spike Lee gone kill me but let me finish',
      'Speedboat swerve, homie watch out for the waves',
      'I told God I\'d be back in a second',
      'She don\'t believe in shooting stars',
      'To whom much is given, much is tested',
      'So if the devil wear Prada, Adam Eve wear nada',
      'But I been talking to God for so long. That if you look at my life I guess he\'s talking back',
      'You more like "love to start shit"',
      'This is my life homie, you decide yours',
      'When they reminisce over you, my God',
      'Straight from the page of your favorite author',
      'But I was good with the Yay as a wholesaler',
      'Have you ever popped champagne on a plane, while gettin some brain',
      'I go for mine, I gots to shine',
      'These Yeezys jumped over the Jumpman',
      'Ask any dope boy you know, they admire \'Ye',
      'Ooh they so sensitive',
      'Went from most hated to the champion god flow',
      'Yo it\'s gots to be cause I\'m seasoned',
      'She stopped drinking Diet Coke. She on that coke diet.',
      'Goin\' H·A·M in Ibiza done took a toll on us',
      'We hardly talk, I was doing my thang',
      'Aww man, you sold your soul',
      'Since Prince was on Apollonia',
      'Havin money\'s not everything not havin it is',
      'Did strippers not make an ark when I made it rain?',
      'I\'m trying to stab two like Jack the Tripper.',
      'Ooh they so sensitive',
      'Since O.J. had Isotoners',
      'That’s Dior Homme, not “Dior, homie”',
      'Why I only got a problem when you in the hood',
      'I guess every superhero need his theme music.',
      'Shit, they say the best things in life are free',
      'That’s the way I need Jesus.',
      'Something’s wrong, I hold my head',
      'I\'m like the fly Malcolm X, buy any jeans necessary',
      'Got a light-skinned friend look like Michael Jackson',
      'Went from most hated to the champion god flow',
      'Who knew that life would move this fast?',
      'Too many Urkels on your team, that’s why your wins low.',
      'Ooh they so sensitive',
      'Did strippers not make an ark when I made it rain?',
      'They ain’t see me \'cause I pulled up in my other Benz',
      'You love me for me...could you be more phony?',
      'You know how long I been on ya',
      'Cause we can\'t get along, no resolution',
      'Got a dark-skinned friend look like Michael Jackson.',
      'Ooh they so sensitive',
      'Why yes...But I prefer the term \'African-American Express.\'',
      'It’s kinda crazy that’s all considered the same thing.',
      'Who knew I’d have to look at you through a glass?'
  ];

   return yeezyQuotes[Math.floor(Math.random()*yeezyQuotes.length)];
};

io.sockets.on('connection', function (socket) {
    socket.emit('connected', { 'sid': 1012930123});

    socket.on('confess', function (data) {
        console.log(data);

        socket.emit('yeezy', { reply: getReply(data) });
    });

});


server.listen(port);
console.log('Listening on port ' + port + '.');