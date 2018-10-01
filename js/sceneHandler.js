initScreen();

function initScreen() {
   // var link = document.querySelector('link[rel="import"]');
   // var content = link.import;

    // Grab DOM from warning.html's document.
    //var el = content.querySelector('.mainScreen');

    //document.body.appendChild(el.cloneNode(true));
    //document.getElementById("screen").replaceChild(el.cloneNode(true), document.getElementById("initScreen"));
    //document.getElementById("screen").appendChild(el.cloneNode(true));
          
    //$('#initScreen').load('#mainScreen');
           
   // $('#initScreen').load('screens.html');

}

function goToRules() {
   // var link = document.querySelector('link[rel="import"]');
    //var content = link.import;

    // Grab DOM from screens.html's document.
   // var el = content.querySelector('.rulesScreen');

    //document.body.appendChild(el.cloneNode(true));
    //document.getElementById("screen").replaceChild(el.cloneNode(true), document.getElementById("mainScreen"));
   // document.getElementById("screen").appendChild(el.cloneNode(true));
    //document.getElementById("screen").removeChild(document.getElementById("screen").firstChild);
   // $(document).ready(function(){
       $('#initScreen').load('scene1.html');
   // });
}

function goToGame() {

}

function goToEnd() {

}

function goToMain() {

}

function goToScores() {

}