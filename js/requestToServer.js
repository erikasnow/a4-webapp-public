var describeReq = new XMLHttpRequest();
var inspectReq = new XMLHttpRequest();
var actionReq = new XMLHttpRequest();
var addReq = new XMLHttpRequest();
var scoreReq = new XMLHttpRequest();

// Get inspect use_id
inspectReq.onload = function() {
        window.inspectResult = JSON.parse(inspectReq.responseText);
        console.log("Inspect result: " + inspectReq.responseText);    
}
describeReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        //window.inventory.active
        //updateDisplayItem(itemId, inventoryNumber, this.responseText);
    }
};


// Get interaction
actionReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        window[this.responseText];
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

    actionReq.open('GET', '/interaction');
    actionReq.setRequestHeader('Content-type', 'application/json');
    actionReq.send(JSON.stringify(interacting));
}

// Need to figure out what to give this, and what we want - e.g use_id? inspect_result_id? (which is a use_id)
function getInspectResultId(player, obj_id) {
    var inspecting = {};

    inspecting.player = player;
    inspecting.obj_id = obj_id;

    console.log(JSON.stringify(inspecting));

    inspectReq.open('POST', '/inspect');
    inspectReq.send(JSON.stringify(inspecting));
}
function getInspectResultId2(obj_id) {
    var inspecting = {};

    inspecting.player = player;
    inspecting.obj_id = obj_id;

    console.log(JSON.stringify(inspecting));

    inspectReq.open('POST', '/inspect2');
    inspectReq.send(JSON.stringify(inspecting));
}
function getDescription(use_id) {
    var usage = {};

    usage.use_id = use_id;

    describeReq.open('POST', '/description');
    describeReq.send(JSON.stringify(usage));
}