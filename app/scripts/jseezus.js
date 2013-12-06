/**
 * Created by akil.harris on 11/21/13.
 */

//Handles the peek through to see the one and only yeezus.
var BANNER_COUNT = 25;
var FINISHED_COUNT = 0;
var KILL_LOOP = false;
var KILL_LOOP2 = false;

var digiYeezusHeadline = function() {

    var spansToAdd = 10;
    var spanText = 'Yeezus';
    for(var i = 0; i < spansToAdd; i++) {
        var x = i * 5 + (Math.random() * 50);
        var y = i * 5 + (Math.random() * 80);
        var r = Math.ceil(Math.random() * 255);
        var g = Math.ceil(Math.random() * 255);
        var b = Math.ceil(Math.random() * 255);

        $('h1').append('<span class="headSpan" id="headSpan_' + i + '">' + spanText + '</span>');
        $('#headSpan_' + i).css({
            'top':y,
            'left':x,
            'color': 'rgb(' + r + ',' + g + ',' + b + ')'
        });
    }
};

var setRapper = function() {
    var wrapper = $('#wrapper');
    var confession_input = $('#confession_input');
    wrapper.mousemove(function(e) {

        var body = $('body');
        var yeezus = $('#digital_yeezus');
        var margin = parseInt($('#wrapper').css('margin-left').replace('px',''), 10);
        var width = parseInt(yeezus.css('width').replace('px',''), 10);
        var backgroundImageWidth = 1016;
        var backgroundImageHeight = 765;
        var bodyWidth = parseInt(body.width(), 10);
        var bodyHeight = parseInt(body.height(), 10);
        var backgroundOffsetLeft = (bodyWidth - backgroundImageWidth) / 2;
        var backgroundOffsetTop  = (bodyHeight - backgroundImageHeight);
        var backgroundTopPosition;
        var backgroundLeftPosition;

        var pos = {
            x : e.pageX-(width/2),
            y : e.pageY-(width/2)
        };

        if (backgroundOffsetTop > 0) {
            backgroundTopPosition = -((pos.y + backgroundImageHeight) - (bodyHeight));
        } else {
            backgroundTopPosition = -((pos.y + backgroundImageHeight) - bodyHeight);
        }

        if(backgroundOffsetLeft > 0) {
            backgroundLeftPosition = -(((pos.x + backgroundImageWidth) - bodyWidth) + backgroundOffsetLeft);
        } else {
            backgroundLeftPosition = -((pos.x + backgroundImageWidth) - bodyWidth) + Math.abs(backgroundOffsetLeft);
        }

//        console.log("backgroundOffsetLeft        : " + backgroundOffsetLeft);
//        console.log("backgroundOffsetTop         : " + backgroundOffsetTop);
//        console.log("bodyWidth                     : " + bodyWidth);
//        console.log("bodyHeight                    : " + bodyHeight);
//        console.log("e.pageY                       : " + e.pageY);
//        console.log("e.pageX                       : " + e.pageX);
//        console.log("e.pageY-(width/2)             : " + pos.y);
//        console.log("e.pageX-(width/2)             : " + pos.x);
//        console.log("backgroundTopPosition       : " + backgroundTopPosition);
//        console.log("backgroundLeftPosition      : " + backgroundLeftPosition);
//        console.log("************************************");

        yeezus.css({
            'top' : pos.y,
            'left' : pos.x,
            'background-position' :  backgroundLeftPosition + 'px ' + backgroundTopPosition + 'px'
        });
    });
    wrapper.dblclick(function () {
        var confessional = $('#confessional');
        if (confessional.css('display') === 'block') {
            confessional.css('display', 'none');
        }
    });
    $('#submit').click(function () { confess(); });
    confession_input.keydown(function (e) {
          if (e.which === 13) {
              var val = confession_input.val();

              if (val !== '') {
                  confess();
                  confession_input.val('');
              } else {
                  updateConfessional('Excuse me, was you saying something?', true);
              }

          }
    });
    $('#confession').click(function () {
        $('#confession_input').focus();
    });
};

var animateLilYeezies = function () {
//    $('#banner_yeezus div').each(function (i) {
//
//    });
};

var flicker = function(element, count) {
    $(element).each(function loop() {
        if(!KILL_LOOP2 && count > 0) {
            $(this).animate({
                opacity: 0.0
            },25, function (){
                $(this).animate({
                    opacity: 1
                },25,loop);
            });
        }
        count--;
    });
};

var getFontFamily = function() {
    var fonts = ['Caesar Dressing', 'Monoton', 'Creepster', 'Ewert', 'Bangers', 'Hanalei', 'Piedra'];
    return fonts[Math.floor(Math.random() * fonts.length)];
};

var loopBanners = function() {
    $('.confess').each(function () {
        $(this).css('display', 'block');
    });
    flicker('.confess', 14);
//        $('#banner_yeezus').each(function loop() {
//            if(!KILL_LOOP2) {
//                $(this).animate({
//                    opacity: 0.0
//                },25, function (){
//                    $(this).animate({
//                        opacity: 1
//                    },25,loop);
//                });
//            }
//        });
};

var startLoopBanners = function() {
    if(FINISHED_COUNT === BANNER_COUNT) {
        loopBanners();
    } else {
        setTimeout(startLoopBanners, 150);
    }
};

var fontFlipper = function(element, count) {
    $(element).each(function loop() {
        if(count > 0) {
            $(this).css('font-family', getFontFamily());
            setTimeout(loop, 500);
        }
        count--;
    });
};

var bannerIn = function() {

    for (var i = 0; i < BANNER_COUNT; i++) {
        $('#banner_yeezus').append('<div id="banner_' + i + '"></div>');
        var banner = $('#banner_' + i);
        banner.css('height','+=' + 0.25 * i);
        banner.animate({
            top: 200 + (i * 26 - (i * 3)) + 'px'
        },(100*(i+10)),function () {
            FINISHED_COUNT++;
        });
    }

    startLoopBanners();
};

var dropout = function() {
    fontFlipper('h2',15);

//    $('#cancel').click(function () {
//        $('#confessional').css('display','none');
//    });

    $('.confess').click(function () {
        $('#confessional').css('display','block');
        $('#confession_input').focus();
    });

    $('h2').click(function () {
        animateLilYeezies();
    });

    $('body').click(function () {
        if(!KILL_LOOP) {
            KILL_LOOP = true;
            $(this).css('cursor','help');
            bannerIn();
            //loopBanners();

        } else if (FINISHED_COUNT === BANNER_COUNT) {
            KILL_LOOP2 = true;
            $('#banner_yeezus').css('opacity','1');
        }
    });
};

var binMe = function(str){
    var st, d;
    var arr = [];
    var len = str.length;

    for (var i = 1; i <= len; i++) {
        d = str.charCodeAt(len-i);
        for (var j = 0; j < 8; j++) {
            arr.push(d%2);
            d = Math.floor(d/2);
        }
    }

    return arr.reverse().join('');
};

var updateConfessional = function (data, isYeezus) {
    var confession = $('#confession');
    var newLine = isYeezus ? '<p class="yeezus_talks">' + data + '</p>' : '<p class="user_talks">' + data + '</p>'
    confession.append(newLine);
    confession.scrollTop(confession[0].scrollHeight);
};

var confess = function () {
    var confessionInput =$('#confession_input');
    var message = confessionInput.val();
    socket.emit('confess', { my: message });
    confessionInput.val('');
    updateConfessional(message, false);
};

var knock = function (count) {
    socket.emit('knock', { times: count });
};

var seeIfYeezusIsIn = function () {

    setTimeout(function () {
        knock(1);
    }, 5000);
};


/* socket.io setup */
var socket = io.connect();
socket.on('yeezy', function (data) {
    updateConfessional(data.reply, true);
});

socket.on('connected', function (data) {
    var sid = data.sid;
    console.log('session id: ' + sid);
});
/* end socket.io setup */