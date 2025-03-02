window.addEventListener('load', function() {
setTimeout(scrollTo, 0, 0, 1);

  window.setTimeout(function() {
    var bubble = new google.bookmarkbubble.Bubble();

    var parameter = 'bmb=1';

    bubble.hasHashParameter = function() {
      return window.location.hash.indexOf(parameter) != -1;
    };

    bubble.setHashParameter = function() {
      if (!this.hasHashParameter()) {
        window.location.hash += parameter;
      }
    };

    bubble.getViewportHeight = function() {
      return window.innerHeight;
    };

    bubble.getViewportScrollY = function() {
      return window.pageYOffset;
    };

    bubble.registerScrollHandler = function(handler) {
      window.addEventListener('scroll', handler, false);
    };

    bubble.deregisterScrollHandler = function(handler) {
      window.removeEventListener('scroll', handler, false);
    };

    bubble.showIfAllowed();
  }, 2000);

function replaceAgent(replacementText) {
var needle= "Mobile";
var myOldString = document.getElementById('replace').innerHTML;
var myNewString = myOldString.replace(needle, replacementText);
document.getElementById('replace').innerHTML = myNewString;
}

if((navigator.userAgent.match(/iPad/i))) {
  var replacementText = "iPad";
  replaceAgent(replacementText);
}
/*
if((navigator.userAgent.match(/iPhone/i))) {
  var replacementText = "iPhone";
  replaceAgent(replacementText);
}

if((uagent.search(deviceAndroid) > -1)) {
  var replacementText = "Android";
  replaceAgent(replacementText);
}

if((navigator.userAgent.match(/iPod/i))) {
  var replacementText = "iPod";
  replaceAgent(replacementText);
}
*/

}, false);