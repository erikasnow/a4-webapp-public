function changeScreen(newScreen) {
    newScreen = newScreen + '.html';
    $('#initScreen').load(newScreen);
}

function goToRules() {
    $('#initScreen').load('rulesScreen.html');
}

function goToGame() {
    $('#initScreen').load('tutorialScreen.html');
}

function goToEnd() {
    $('#initScreen').load('endScreen.html');
}

function goToMain() {
    $('#initScreen').load('mainScreen.html');
}

function goToScores() {
    $('#initScreen').load('scoreScreen.html');
}