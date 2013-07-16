//bookmarklet code . Extra comment

// javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://localhost:3000/jsbookmarklet.js?q=Math.random()';})();
//localhost to be used in development, however change the domain to whatever is used in production.

//vital parts of the code:

//1) this public facing js file at http://localhost:3000/jsbookmarklet.js
//2) the rails routes in app/bookmarks_controller.rb and the "new" action

(function(){

  var v = "1.9.1";

  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done = false;
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
        done = true;
        initMyBookmarklet();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    initMyBookmarklet();
  }

  function initMyBookmarklet() {
    (window.myBookmarklet = function() {

      var doctitle = document.title;
      var doclocation = document.location;
      var selectedText = '';
      
      //Cross Browser compatibility, to retrieve selected text from IE, Firefox, Webkit(Safari and Chrome)
      //Similar to code retrieved from http://help.dottoro.com/ljcvonpc.php
      function getSelText() {
        var SelText = '';
        if (window.getSelection) {
          SelText = window.getSelection();
        } else if (document.getSelection) {
          SelText = document.getSelection();
        } else if (document.selection) {
          SelText = document.selection.createRange().text;
        }
        return SelText;
      }

       selectedText = getSelText();

     var NWin = window.open('http://quote8.herokuapp.com/bookmarks/new?text= ' + encodeURIComponent(selectedText) + '&title=' + encodeURIComponent(doctitle) + '&url=' + encodeURIComponent(doclocation) + '&bookmarklet=1' , '', 'height=600,width=450');

     if (window.focus)
     {
       NWin.focus();

     }
     return false;

    })();
  }


})();
