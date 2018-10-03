var inspectReq = new XMLHttpRequest();
var actionReq = new XMLHttpRequest();
var addReq = new XMLHttpRequest();
var scoreReq = new XMLHttpRequest();

// Get inspect use_id
inspectReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        //call function with use_id as a result of inspection of object
        //item name, description based on the character (current id of object)
    }
};

// Get interaction
actionReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        //call function this.responseText;
    }
};

addReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        getScores();
    }
};

scoreReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);

        if (data.length > 0) {
            fillTable(data);
        }
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

// Need to figure out what to give this, and what we want - e.g use_id? inspect_result_id? (which is a use_id)
function getAction() {
    actionReq.open('GET', '/action');
    scoreReq.setRequestHeader('Content-type', 'application/json');
    actionReq.send();
}

// Need to figure out what to give this, and what we want - e.g use_id? inspect_result_id? (which is a use_id)
function getInspectUseId() {
    inspectReq.open('GET', '/inspect');
    scoreReq.setRequestHeader('Content-type', 'application/json');
    inspectReq.send();
}