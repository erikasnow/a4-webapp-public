const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

module.exports.connect = function() {
    client.connect();
};

// Player would be in terms of index numbers
module.exports.isUsable = function(player, object_id) {
    var query = "SELECT e_use, a_use, j_use, k_use FROM inventory WHERE obj_id = " + object_id + ";";

    client.query(query, function (err, result) {
        if (result.rows.length === 1) {
            return parseInt(result.columns[player], 10);
        }
    });
};

module.exports.getUseId = function(player, object_id) {
    var use_id = 0;
    var player_num = isUsable(player, object_id);

    if (player_num > 0) { // Usable object to player
        use_id = player_num + object_id;
    }

    return use_id;
};

module.exports.getDescription = function(player, object_id) {
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

module.exports.getInspectResult = function(player, object_id) {
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

module.exports.getAction = function(scene_num, use_id) {
    var query = "SELECT action FROM scene" + scene_num +"_interaction WHERE use_id = " + use_id + ";";

    client.query(query, function(err, result) {
        if (result.rows.length === 1) {
            return result.rows[0].action;
        } else {
            return "";
        }
    });
};

module.exports.uploadToInventory = function(json) {
    console.log('loading data to inventory!');
    var query = `INSERT INTO inventory VALUES('${json.obj_id}', '${json.e_use}', '${json.a_use}', '${json.j_use}', '${json.k_use}');`;

    client.query(query);
};

module.exports.uploadToObjectUse = function(json) {
    var query = `INSERT INTO object_use VALUES('${json.use_id}', '${json.name}', '${json.description}', '${json.inspect_result}');`;

    client.query(query);
};

module.exports.uploadToScene1 = function(json) {
    var query = `INSERT INTO scene1_interaction VALUES('${json.use_id}', '${json.scene_id}', '${json.action}');`;

    client.query(query);
};