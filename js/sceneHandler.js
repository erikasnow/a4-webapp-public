function changeScreen(newScreen) {
    newScreen = newScreen + '.html';
    $('#initScreen').load(newScreen);
}
