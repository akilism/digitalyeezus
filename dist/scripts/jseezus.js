var BANNER_COUNT=25,FINISHED_COUNT=0,KILL_LOOP=!1,KILL_LOOP2=!1,digiYeezusHeadline=function(){for(var a=10,b="Yeezus",c=0;a>c;c++){var d=5*c+50*Math.random(),e=5*c+80*Math.random(),f=Math.ceil(255*Math.random()),g=Math.ceil(255*Math.random()),h=Math.ceil(255*Math.random());$("h1").append('<span class="headSpan" id="headSpan_'+c+'">'+b+"</span>"),$("#headSpan_"+c).css({top:e,left:d,color:"rgb("+f+","+g+","+h+")"})}},setRapper=function(){var a=$("#wrapper"),b=$("#confession_input");a.mousemove(function(a){var b,c,d=$("body"),e=$("#digital_yeezus"),f=(parseInt($("#wrapper").css("margin-left").replace("px",""),10),parseInt(e.css("width").replace("px",""),10)),g=1016,h=765,i=parseInt(d.width(),10),j=parseInt(d.height(),10),k=(i-g)/2,l=j-h,m={x:a.pageX-f/2,y:a.pageY-f/2};b=l>0?-(m.y+h-j):-(m.y+h-j),c=k>0?-(m.x+g-i+k):-(m.x+g-i)+Math.abs(k),e.css({top:m.y,left:m.x,"background-position":c+"px "+b+"px"})}),a.dblclick(function(){var a=$("#confessional");"block"===a.css("display")&&a.css("display","none")}),$("#submit").click(function(){confess()}),b.keydown(function(a){if(13===a.which){var c=b.val();""!==c?(confess(),b.val("")):updateConfessional("Excuse me, was you saying something?",!0)}}),$("#confession").click(function(){$("#confession_input").focus()})},animateLilYeezies=function(){},flicker=function(a,b){$(a).each(function c(){!KILL_LOOP2&&b>0&&$(this).animate({opacity:0},25,function(){$(this).animate({opacity:1},25,c)}),b--})},getFontFamily=function(){var a=["Caesar Dressing","Monoton","Creepster","Ewert","Bangers","Hanalei","Piedra"];return a[Math.floor(Math.random()*a.length)]},loopBanners=function(){$(".confess").each(function(){$(this).css("display","block")}),flicker(".confess",14)},startLoopBanners=function(){FINISHED_COUNT===BANNER_COUNT?loopBanners():setTimeout(startLoopBanners,150)},fontFlipper=function(a,b){$(a).each(function c(){b>0&&($(this).css("font-family",getFontFamily()),setTimeout(c,500)),b--})},bannerIn=function(){for(var a=0;BANNER_COUNT>a;a++){$("#banner_yeezus").append('<div id="banner_'+a+'"></div>');var b=$("#banner_"+a);b.css("height","+="+.25*a),b.animate({top:200+(26*a-3*a)+"px"},100*(a+10),function(){FINISHED_COUNT++})}startLoopBanners()},displayMenu=function(){var a=$("#confession");-1===a.text().indexOf("Y33ZU5")&&a.append('<p class="yeezus_talks">D1G1T4L Y33ZU5 v0.1....I hope this take away from ya sins..</p>')},dropout=function(){fontFlipper("h2",15),$(".confess").click(function(){$("#confessional").css("display","block"),$("#confession_input").focus(),displayMenu()}),$("h2").click(function(){animateLilYeezies()}),$("body").click(function(){KILL_LOOP?FINISHED_COUNT===BANNER_COUNT&&(KILL_LOOP2=!0,$("#banner_yeezus").css("opacity","1")):(KILL_LOOP=!0,$(this).css("cursor","help"),bannerIn())})},binMe=function(a){for(var b,c=[],d=a.length,e=1;d>=e;e++){b=a.charCodeAt(d-e);for(var f=0;8>f;f++)c.push(b%2),b=Math.floor(b/2)}return c.reverse().join("")},updateConfessional=function(a,b){var c=$("#confession"),d=b?'<p class="yeezus_talks">'+a+"</p>":'<p class="user_talks">'+a+"</p>";c.append(d),c.scrollTop(c[0].scrollHeight)},confess=function(){var a=$("#confession_input"),b=a.val();socket.emit("confess",{my:b}),a.val(""),updateConfessional(b,!1)},knock=function(a){socket.emit("knock",{times:a})},seeIfYeezusIsIn=function(){setTimeout(function(){knock(1)},5e3)},socket=io.connect();socket.on("yeezy",function(a){updateConfessional(a.reply,!0)}),socket.on("connected",function(a){var b=a.sid;console.log("session id: "+b)});