const {Client} = require('pg');

const client = new Client({
    connectionString: "postgres://zvljjxcivhgpbj:7ba4c3f46baae568b78bd1ef78d068005cec4e5961b466931bf9fb0509864786@ec2-174-129-35-61.compute-1.amazonaws.com:5432/d9aba1dijctb3j",
    ssl: true
});

exports.connect = function() {
    client.connect();
};

// Player would be in terms of index numbers
exports.isUsable = function(player, object_id) {
    var query = "SELECT e_use, a_use, j_use, k_use FROM inventory WHERE obj_id = " + object_id + ";";

    client.query(query, function (err, result) {
        if (result.rows.length === 1) {
            return parseInt(result.columns[player], 10);
        }
    });
};

exports.getUseId = function(player, object_id) {
    var use_id = 0;
    var player_num = isUsable(player, object_id);

    if (player_num > 0) { // Usable object to player
        use_id = player_num + object_id;
    }

    return use_id;
};

exports.getDescription = function(player, object_id) {
    var use_id = getUserId(player, object_id);

    if (use_id > 0) {
        var query = "SELECT description FROM object_use WHERE use_id = " + use_id + ";";

        client.query(query, function (err, result) {
            if (result.rows.length === 1) {
                return result.rows[0].description;
            }
        });

    } else {
        return "?";
    }
};

exports.getInspectResult = function(player, object_id) {
    var use_id = getUseId(player, object_id);

    if (use_id > 0) {
        var query = "SELECT inspect_result_id FROM object_use WHERE use_id = " + use_id + ";";

        client.query(query, function(err, result) {
            if (result.rows.length === 1) {
                use_id = parseInt(result.rows[0].inspect_result, 10);
            }
        });
    }

    return use_id;
}

exports.getAction = function(scene_num, use_id) {
    var query = "SELECT action FROM scene" + scene_num +"_interaction WHERE use_id = " + use_id + ";";

    client.query(query, function(err, result) {
        if (result.rows.length === 1) {
            return result.rows[0].action;
        } else {
            return "";
        }
    });
};

exports.uploadToInventory = function(data) {
    var i;
    console.log('loading data to inventory!');

    for (i = 0; i < data.length; i++) {
        var query = `INSERT INTO inventory VALUES('${data[i].obj_id}', '${data[i].e_use}', '${data[i].a_use}', '${data[i].j_use}', '${data[i].k_use}');`;
        client.query(query, function (err, result) {
        });
    }
};

exports.uploadToObjectUse = function(data) {
    var i;
    console.log('loading data to object use!');

    for (i = 0; i < data.length; i++) {
        var query = `INSERT INTO object_use VALUES('${data[i].use_id}', '${data[i].name}', '${data[i].description}', '${data[i].inspect_result}');`;
        client.query(query, function (err, result) {
        });
    }
};

exports.uploadToScene1 = function(data) {
    var i;
    console.log('loading data to interaction!');

    for (i = 0; i < data.length; i++) {
        var query = `INSERT INTO scene1_interaction VALUES('${data[i].use_id}', '${data[i].scene_id}', '${data[i].action}');`;
        client.query(query, function (err, result) {
        });
    }
};