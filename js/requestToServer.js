var describeReq = new XMLHttpRequest();
var inspectReq = new XMLHttpRequest();
var inspectReq2 = new XMLHttpRequest();
var actionReq = new XMLHttpRequest();
var addReq = new XMLHttpRequest();
var scoreReq = new XMLHttpRequest();

// Get inspect use_id
inspectReq.onload = function() {
    window.inspectResult = JSON.parse(inspectReq.responseText);
}
inspectReq2.onload = function() {
    window.inspectResult = JSON.parse(inspectReq2.responseText);
}
describeReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        //window.inventory.active
        //updateDisplayItem(itemId, inventoryNumber, this.responseText);
    }
};

// Get interaction
actionReq.onload = function() {
        if (actionReq.responseText !== "") {
            eval("var action_fcn = function() {" + actionReq.responseText + ";}");
            action_fcn();
        }

        console.log("function is: " + actionReq.responseText);
        
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

function getScores() {
    scoreReq.open('GET', '/score');
    scoreReq.setRequestHeader('Content-type', 'application/json');
    scoreReq.send();
}

function addScore(name, score) {
    var score_info = {};

    score_info.name = name;
    score_info.score = score;

    addReq.open('PUT', '/add');
    addReq.send(JSON.stringify(score_info));
}

// Need to figure out what to give this, and what we want - e.g use_id? inspect_result_id? (which is a use_id)
function performAction(use_id, scene_id) {
    var interacting = {};

    interacting.use_id = use_id;
    interacting.scene_id = scene_id;

    console.log("Performing action on: " + JSON.stringify(interacting));

    actionReq.open('POST', '/interaction');
    actionReq.send(JSON.stringify(interacting));
}

// Need to figure out what to give this, and what we want - e.g use_id? inspect_result_id? (which is a use_id)
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