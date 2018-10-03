var scoreReq = new XMLHttpRequest();

scoreReq.onreadystatechange = function() {
    if (this.readState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);
    }
};

function getScores() {
    scoreReq.open('GET', '/score');
    scoreReq.setRequestHeader('Content-type', 'application/json');
    scoreReq.send();
}