var addReq = new XMLHttpRequest();
var scoreReq = new XMLHttpRequest();

addReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        getScores();
    }
};

scoreReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);

        fillTable(data);
    }
};

function fillTable(data) {
    var htmlTable = `${
        data.map(data = function() {
            `<tr><td>${data.name}</td><td>${data.score}</td></tr>`
        }).join('')
        }`;
    document.getElementById("scoreTable").innerHTML += htmlTable;
}

function getScores() {
    scoreReq.open('GET', '/score');
    scoreReq.setRequestHeader('Content-type', 'application/json');
    scoreReq.send();
}

function addScore(name, score) {
    addReq.open('PUT', '/add');
    addReq.send(JSON.stringify([{"name": name, "score": score}]));
}