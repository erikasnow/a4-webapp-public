const {Client} = require('pg');

const client = new Client({
    connectionString: "postgres://zvljjxcivhgpbj:7ba4c3f46baae568b78bd1ef78d068005cec4e5961b466931bf9fb0509864786@ec2-174-129-35-61.compute-1.amazonaws.com:5432/d9aba1dijctb3j",
    ssl: true
});

exports.connect = function() {
    client.connect();
};

exports.getDescription = function(use_id, res) {
    var query = `SELECT description FROM object_use WHERE use_id = '${use_id}';`;

    client.query(query, function (err, result) {
        if (result.rows.length === 1) {
            res.end(result.rows[0].description);
        } else {
            res.end("");
        }
    });
};

exports.getInspectResult = function(player, obj_id, res) {
    var obj_idQuery = `SELECT * FROM inventory WHERE obj_id = '${obj_id}';`;

    client.query(obj_idQuery, function (err, result) {
        var use_id;

        switch (player) {
            case 'Erika':
                use_id = obj_id + result.rows[0].e_use;
                break;
            case 'Ally':
                use_id = obj_id + result.rows[0].a_use;
                break;
            case 'Joan':
                use_id = obj_id + result.rows[0].j_use;
                break;
            case 'Krysta':
                console.log("KRYSTA")
                use_id = obj_id + result.rows[0].k_use;
                break;
        }
        var inspect_idQuery = `SELECT * FROM object_use WHERE use_id = '${use_id}';`;

        client.query(inspect_idQuery, function(err, result) {
            if (result.rows.length === 1) {
                res.end(JSON.stringify(result.rows[0]));
            } else {
                res.end();
            }
        });
    });
};

exports.getInspectResult2 = function(obj_id, res) {

        var inspect_idQuery = `SELECT inspect_result FROM object_use WHERE use_id = '${obj_id}';`;
        client.query(inspect_idQuery, function(err, result) {
            if (result.rows.length == 1) {
                var id = result.rows[0].inspect_result
                var inspect_idQuery2 = `SELECT * FROM object_use WHERE use_id = '${id}';`;
                client.query(inspect_idQuery2, function(err, result2) {
                    if (result2.rows.length === 1) {
                        res.end(JSON.stringify(result2.rows[0]));
                    } else {
                        res.end();
                    }
                });
            } else {
                res.end();
            }
        });

};

exports.getAction = function(scene_item, use_id) {
    var query = `SELECT action FROM scene1_interaction WHERE use_id = '${use_id}' AND scene_id = '${scene_item}';`;
}
exports.getAllScores = function(res) {
    var query = 'SELECT * FROM score;';

    client.query(query, function(err, result) {
        if (result.rows.length > 0) {
            res.end(JSON.stringify(result.rows));
        } else {
            res.end();
        }
    });
};

exports.getFunction = function(use_id, scene_id, res) {
    var query = `SELECT action FROM scene1_interaction WHERE use_id = '${use_id}' AND scene_id = '${scene_id}'`;

    client.query(query, function(err, result) {
        if (result.rows.length > 0) {
            res.end(result.rows[0].action);
        } else {
            res.end();
        }
    });
};

exports.addScore = function(name, score) {
    var query = `INSERT INTO score VALUES('${name}', '${score}');`;

    console.log("add query: " + query);

    client.query(query, function(err, result) {
    });
}

function clearPreviousData(table_name) {
    var query = `DELETE FROM ${table_name}`;

    client.query(query, function(err, result) {
    });
}

exports.uploadToInventory = function(data) {
    var i;
    console.log('loading data to inventory!');

    clearPreviousData('inventory');

    for (i = 0; i < data.length; i++) {
        var query = `INSERT INTO inventory VALUES('${data[i].obj_id}', '${data[i].e_use}', '${data[i].a_use}', '${data[i].j_use}', '${data[i].k_use}');`;
        client.query(query, function (err, result) {
        });
    }
};

exports.uploadToObjectUse = function(data) {
    var i;
    console.log('loading data to object use!');

    clearPreviousData('object_use');

    for (i = 0; i < data.length; i++) {
        var query = `INSERT INTO object_use VALUES('${data[i].use_id}', '${data[i].name}', '${data[i].description}', '${data[i].inspect_result}');`;
        client.query(query, function (err, result) {
        });
    }
};

exports.uploadToScene1 = function(data) {
    var i;
    console.log('loading data to interaction!');

    clearPreviousData('scene1_interaction');

    for (i = 0; i < data.length; i++) {
        var query = `INSERT INTO scene1_interaction VALUES('${data[i].use_id}', '${data[i].scene_id}', '${data[i].action}');`;
        client.query(query, function (err, result) {
        });
    }
};