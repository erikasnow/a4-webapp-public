function goToRules() {
    var link = document.querySelector('link[rel="import"]');
    var content = link.import;

    // Grab DOM from screens.html's document.
    var el = content.querySelector('.rulesScreen');

    //document.body.appendChild(el.cloneNode(true));
    document.getElementById("screen").replaceChild(el.cloneNode(true), document.getElementById("mainScreen"));
}

function goToGame() {

}

function goToEnd() {

}

function goToMain() {

}

function goToScores() {

}