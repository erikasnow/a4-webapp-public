var describeReq = new XMLHttpRequest();
var inspectReq = new XMLHttpRequest();
var inspectReq2 = new XMLHttpRequest();
var actionReq = new XMLHttpRequest();
var addReq = new XMLHttpRequest();
var scoreReq = new XMLHttpRequest();

// Get inspect use_id
inspectReq.onload = function() {
    window.inspectResult = JSON.parse(inspectReq.responseText);
};
inspectReq2.onload = function() {
    window.inspectResult = JSON.parse(inspectReq2.responseText);
};
describeReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        //window.inventory.active
        //updateDisplayItem(itemId, inventoryNumber, this.responseText);
    }
};

// Get interaction
actionReq.onload = function() {
    if (this.responseText !== "") {
        var i;
        var functions = JSON.parse(this.responseText);

        for (i = 0; i < functions.length; i++) {
            eval("var action_fcn = function() {" + functions[i].action + ";}");
            action_fcn();
        }
    }
};

addReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        getScores();
    }
};

scoreReq.onload = function() {
    console.log(this.responseText);
    var data = JSON.parse(this.responseText);

    if (data.length > 0) {
        fillTable(data);
    }
};

function fillTable(data) {
    var i;

    for (i = 0; i < data.length; i++) {
        var htmlTable = `<tr><td>${data[i].name}</td><td>${data[i].score}</td></tr>`;
        document.getElementById("scoreTable").innerHTML += htmlTable;
    }
}

// Gets top 10 scores
function getScores() {
    scoreReq.open('GET', '/score');
    scoreReq.setRequestHeader('Content-type', 'application/json');
    scoreReq.send();
}

function addScore(name, score) {
    var score_info = {};

    score_info.name = name;
    score_info.score = parseInt(score);

    addReq.open('PUT', '/add');
    addReq.send(JSON.stringify(score_info));
}

function performAction(player, obj_id, scene_id) {
    if (obj_id !== undefined) {
        var interacting = {};

        interacting.player = player;
        interacting.obj_id = obj_id;
        interacting.scene_id = scene_id;

        actionReq.open('POST', '/interaction');
        actionReq.send(JSON.stringify(interacting));
    } else {
        console.log("obj_id is undefined!");
    }
}

function getInspectResultId(player, obj_id) {
    var inspecting = {};

    inspecting.player = player;
    inspecting.obj_id = obj_id;

    inspectReq.open('POST', '/inspect');
    inspectReq.send(JSON.stringify(inspecting));
}
function getInspectResultId2(obj_id) {
    var inspecting = {};

    inspecting.obj_id = obj_id;

    inspectReq2.open('POST', '/inspect2');
    inspectReq2.send(JSON.stringify(inspecting));
}
function getDescription(use_id) {
    var usage = {};

    usage.use_id = use_id;

    describeReq.open('POST', '/description');
    describeReq.send(JSON.stringify(usage));
}