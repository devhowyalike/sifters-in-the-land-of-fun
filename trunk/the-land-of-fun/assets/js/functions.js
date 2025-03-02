$("#bootUp p").blink({blinks:[50]});

//Image Preload
(function($) {
  var cache = [];
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  };
})(jQuery);

jQuery.preLoadImages("assets/images/input-bg.gif", "assets/images/score-bg.png", "assets/images/yameen-am-winner.gif", "assets/images/checkmark.gif", "assets/images/scanLine.png", "assets/images/winnersDont.gif");

//Preload Trans bg pngs for less than ie9
if ($.browser.msie && jQuery.browser.version < 9){
jQuery.preLoadImages("assets/images/ieAlpha85.png", "assets/images/ieAlphaWhite80.png", "assets/images/ieAlpha50.png");
}

$(window).load(function(){
//Bootup
$("#container").show();
$("#bootUp").hide();
//Begin Game
$("#playground").scrollview();
$("#playground").click(function() {
  $("#how-to-play").hide();
  return false;
});

//Center div
jQuery.fn.center = function () {
this.css("position","absolute");
this.css("top", ( $("#container").outerHeight() - this.outerHeight() ) / 2+$("#container").scrollTop() + "px");
this.css("left", ( $("#container").outerWidth() - this.outerWidth() ) / 2+$("#container").scrollLeft() + "px");
return this;
};

//Center Instructions
$("div.instructions").center();

//Timer
var timerCounter;

function timerGo(){
var cnt = 0;
timerCounter = setInterval(function() {
$('#displayCounter').html(cnt).time_from_seconds();
$('#leaderboard ul li.time').html(cnt).time_from_seconds();
cnt++;
}, 1000);
}

jQuery.fn.time_from_seconds = function() {
    return this.each(function() {
        var t = parseInt($(this).text(), 10);
        $(this).data('original', t);
        var h = Math.floor(t / 3600);
        t %= 3600;
        var m = Math.floor(t / 60);
        var s = Math.floor(t % 60);
		if($(this).hasClass("time")){
		$(this).text('Time Completed: ' + (h > 0 ? h + ' hour' + ((h > 1) ? 's ' : ' ') : '') +
                     (m > 0 ? m + ' minute' + ((m > 1) ? 's ' : ' ') : '') +
                     s + ' second' + ((s > 1) ? 's' : ''));
		}
		else{
        $(this).text(' and it only took me ' + (h > 0 ? h + ' hour' + ((h > 1) ? 's ' : ' ') : '') +
                     (m > 0 ? m + ' minute' + ((m > 1) ? 's ' : ' ') : '') +
                     s + ' second' + ((s > 1) ? 's' : '') + '!');
		}
    });
};

function stopTimer() {  
clearInterval(timerCounter);  
}

$("#amWin").hide();
function hotSpot(){
	document.getElementById('answer-field').value = "";
	$("#score").show();
	$("input.answers").focus();
	$("input.answers").val(''); //return focus webkit
}

//Scoring
var selectedItem;
var score = 0;
var selectedDiv;
var menuKey;
var answers =
	[
	"hieroglyphics",
	"liberty bell",
	"geno's steaks",
	"rocky",
	"funk-o-mart",
	"love park",
	"transamerica pyramid",
	"yameen",
	"amoeba music"
	];
function checkValue(input){
	if(answers[selectedItem.id.toString().substr(1, 1)] == input){
      score += 1;
      selectedItem.style.display = "none";
      document.getElementById("score-display").innerHtml = score;
}

}

function winGet(){
	$(selectedDiv).after('<img class="ok" src="assets/images/ok.gif" />');
}

$("#hiero").click(function() {
	$("#score").css({'top': '1015px', 'left': '1465px'});
	selectedItem = 0;
	menuKey = ".key1";
	hotSpot();
	selectedDiv = "#hiero";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '1085px', 'left': '1475px'});
	});
$("#liberty").click(function() {
	$("#score").css({'top': '1420px', 'left': '50px'});
	selectedItem = 1;
	menuKey = ".key9";
	hotSpot();
	selectedDiv = "#liberty";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '1515px', 'left': '140px'});
	});
$("#genos").click(function() {
	$("#score").css({'top': '1345px', 'left': '1060px'});
	selectedItem = 2;
	menuKey = ".key2";
	hotSpot();
	selectedDiv = "#genos";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '1400px', 'left': '1080px'});
	});
$("#rocky").click(function() {
	$("#score").css({'top': '1703px', 'left': '1680px'});
	selectedItem = 3;
	menuKey = ".key5";
	hotSpot();
	selectedDiv = "#rocky";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '1796px', 'left': '1693px'});
	});
$("#funkomart").click(function() {
	$("#score").css({'top': '1440px', 'left': '651px'});
	selectedItem = 4;
	menuKey = ".key10";
	hotSpot();
	selectedDiv = "#funkomart";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '1520px', 'left': '651px'});
	});
$("#love").click(function() {
	$("#score").css({'top': '660px', 'left': '1014px'});
	selectedItem = 5;
	menuKey = ".key7";
	hotSpot();
	selectedDiv = "#love";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '700px', 'left': '1084px'});
	});
$("#a0").click(function() {
	$("#score").css({'top': '290px', 'left': '1425px'});
	selectedItem = 6;
	menuKey = ".key4";
	hotSpot();
	selectedDiv = "#a0";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '280px', 'left': '1445px'});
	});
$("#yameen-dj").click(function() {
	$("#score").css({'top': '1705px', 'left': '70px'});
	selectedItem = 7;
	menuKey = ".key3";
	hotSpot();
	selectedDiv = "#yameen-dj";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '1775px', 'left': '90px'});
	});
$("#amoeba").click(function() {
	$("#score").css({'top': '1280px', 'left': '1559px'});
	selectedItem = 8;
	menuKey = ".key8";
	hotSpot();
	selectedDiv = "#amoeba";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '1340px', 'left': '1559px'});
	});
$("#peach").click(function() {
	$("#score").css({'top': '1000px', 'left': '385px'});
	selectedItem = 9;
	menuKey = ".key6";
	hotSpot();
	selectedDiv = "#peach";
	winGet();
	$(selectedDiv).next(".ok").css({'top': '1065px', 'left': '400px'});
	});
	
//Audio OST
var audioOst = document.createElement('audio');
audioOst.setAttribute("preload", "auto");
audioOst.autobuffer = true;

var source1 = document.createElement('source');
source1.type= 'audio/ogg';
source1.src= 'assets/audio/ost.ogg';
audioOst.appendChild(source1);

var source2 = document.createElement('source');
source2.type= 'audio/mpeg';
source2.src= 'assets/audio/ost.mp3';
audioOst.appendChild(source2);

//Audio Controls
var audioTagSupport = !!(document.createElement('audio').canPlayType);
var ost = $(audioOst)[0];
if( audioTagSupport ) {
	audioOst.load();
	$("#audioCatchAll").load('assets/ajax/musicManager.html');
	$("#audio-player").css({'display': 'block'});
	$("#audio-player p a").click(function() {
	$("input.answers").focus(); //return focus to score
	if (ost.paused){
		ost.play();
		$(this).css({'background-position': '0 0'});
	} else {
		ost.pause();
		$(this).css({'background-position': '0 -12px'});
	}
	return false;
		});
	}

//Insert Coin
if( audioTagSupport ) {
$(".instructions").click(function(){
ost.play();
$("#audio-player p a").css({'background-position': '0 0'});
$("#how-to-play").hide();
timerGo();
return false;
});
}
else{
$("li.option3, span.noAudio").show();
$("li.option1").hide();
$("#mapKey").css("top","5px");
$(".instructions").click(function(){
$("#how-to-play").hide();
timerGo();
return false;
});
}

//Input Scoring
$("input.submit").click(function() {
	if(document.getElementById('answer-field').value.toLowerCase() == answers[selectedItem]){
		//alert("correct");
		score += 1;
		$(selectedDiv).next(".ok").css({'display': 'block'});
		$(menuKey).css({'text-decoration': 'line-through'});
		$(menuKey).append('<span class="checkmark"> &#10003;</span>');
		document.getElementById('score-led').innerHTML = score;
		$(selectedDiv).remove();
		$("#score").hide();
		if(score == 1){
		$("#timeBonus").load('assets/ajax/winStage.html');//load this right before final answer
		}
		if(score == 9){
		stopTimer();
		$("#amWin").show();
		$('a[data-text]').each(function(){
           $(".twitter-share-button").attr("data-text", $("#counter, #displayCounter").text());
         });
        $.getScript('http://platform.twitter.com/widgets.js');
        $("#finalScore").center(); //Center Win Stage
		$("#audio-player").hide();
		$("#mapKey").hide();
		ost.pause(); //turn off music
		$("#winSound")[0].play();
}
	}else{
		$("input.answers").pulse({
		opacity: [0,1]
		}, {
		duration: 100,
		times: 3,
		easing: 'linear'
});
		//alert("wrong answer");
		$("input.answers").val('');
		document.getElementById('answer-field').value.toLowerCase();
		//$("#answer-field").toLowerCase();
	}
$("input.answers").val('');
});

//Safari PC fix
$("form").submit(function() {
return false;
});
						  
$("input.answers").keypress(function (e) { //force ie return
	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		$('input.submit').click();
			return false;
		} else {
			return true;
		}
	});
//Counter
$(function(){
          var total_click = 0;
          $("#mapKey a.showKey").click(function(){
            total_click = total_click + 1;
			$("#counter").text("Sifting in #TheLandOfFun. I cheated " + total_click + " whole " + (total_click == 1 ? "time" : "times"));
			$("#leaderboard ul li.cheat").text("Cheated: " + total_click + (total_click == 1 ? " time" : " times"));
return false;
          });
        });

//Map Key
$("#mapKey a.showKey").click(function(){
$(this).hide();
$("#mapKey a.hideKey").show();
$("#mapLegend ul").slideDown();
$("#mapLegend").addClass("mapDark");
$("input.answers").blur(); //lose focus on score
//$("input.answers").val('Please Close The Hints');
return false;
});

$("#mapKey a.hideKey").click(function(){
$(this).hide();
$("#mapKey a.showKey").show();
$("#mapLegend ul").slideUp();
$("#mapLegend").removeClass("mapDark");
$("input.answers").focus();
return false;
 });

$("a.hideKey").hide(); //hide on load

$("#mapLegend ul").click(function(){
$(this).slideUp();
$("#mapKey a.showKey").show();
$("#mapKey a.hideKey").hide();
$("input.answers").focus();
$("#mapLegend").removeClass("mapDark");
});

//disable copy/paste
var originator = $("#mapLegend");
if ($.browser.mozilla) {
originator.each(function () { $(this).css({ 'MozUserSelect': 'none' }); });
} 
else if ($.browser.msie) {
originator.each(function () { $(this).bind('selectstart.disableTextSelect', 
function () { return false; }); });
} 
else {
originator.each(function () { $(this).bind('mousedown.disableTextSelect', 
function () { return false; }); });
}

//Credits
var credits = new ShowCredits();
credits.code = function() {
	if( audioTagSupport ) {
	ost.pause();
	}
    $("#container").load("assets/ajax/credits.html", function() {
        $("#credits").prepend("<span></span>");
        var b = document.getElementById("neoGeoBootUp");
        setTimeout(function() {
			if( audioTagSupport ) {
            b.play();
			}
        },
        2000);
        var a = $("#credits");
        a.animate({
            opacity: 0
        },
        {
            duration: 1
        }).animate({
            opacity: 0
        },
        500).animate({
            opacity: 0
        },
        {
            duration: 1
        }).animate({
            opacity: 0
        },
        {
            duration: 100
        }).animate({
            opacity: 0.5
        },
        {
            duration: 10
        }).animate({
            opacity: 0
        },
        {
            duration: 300
        }).animate({
            opacity: 0.6
        },
        {
            duration: 100
        }).animate({
            opacity: 0
        },
        {
            duration: 200
        }).animate({
            opacity: 1
        },
        {
            duration: 100
        }).animate({
            opacity: 0
        },
        {
            duration: 100
        }).animate({
            opacity: 0.3
        },
        {
            duration: 100
        }).animate({
            opacity: 1
        },
        {
            duration: 10
        }).animate({
            opacity: 1
        },
        {
            duration: 5000
        });
    });
};

credits.load();

});

$('#playground').maphilight();