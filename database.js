const {Client} = require('pg');

const client = new Client({
    connectionString: "postgres://zvljjxcivhgpbj:7ba4c3f46baae568b78bd1ef78d068005cec4e5961b466931bf9fb0509864786@ec2-174-129-35-61.compute-1.amazonaws.com:5432/d9aba1dijctb3j",
    ssl: true
});

exports.connect = function() {
    client.connect();
};

function getPlayerIndex(player) {
    switch(player) {
        case 'Erika': return 0;
        case 'Ally': return 1;
        case 'Joan': return 2;
        case 'Krysta': return 3;
    }
}

exports.isUsable = function(player, object_id) {
    console.log("ID "+ object_id)
    var query = `SELECT e_use, a_use, j_use, k_use FROM inventory WHERE obj_id = '${object_id}';`;
    var index = getPlayerIndex(player);
    var resultID ;

    client.query(query, function (err, result) {
        if (result.rows.length === 1) {
            //console.log(result)
            //console.log(result.rows[0].e_use)
            console.log("Indes"+ index)
            console.log(result.rows[0].e_use)

            switch(index) {
                
                case 0:
                    resultID= result.rows[0].e_use;
                    break;
                case 1:
                resultID= result.rows[0].a_use;
                    break;
                case 2:
                    console.log(result.rows[0].j_use)
                    resultID= result.rows[0].j_use;
                    break;
                case 3:
                resultID= result.rows[0].k_use;
                    break;
            }

            //return result.columns[index];
            console.log("RESULT"+resultID)
            return resultID;
        }
    });
    
};

exports.getUseId = function(player, object_id) {
    var use_id = null;
    var num = exports.isUsable(player, object_id);
    console.log("Num"+ num)

    if (num !== null) { // Usable object to player
        use_id = object_id + num;
    }

    return use_id;
};

exports.getDescription = function(player, object_id) {
    var use_id = getUseId(player, object_id);

    if (use_id !== null) {
        var query = `SELECT description FROM object_use WHERE use_id = '${use_id}';`;

        client.query(query, function (err, result) {
            if (result.rows.length === 1) {
                return result.rows[0].description;
            }
        });

    } else {
        return "?";
    }
};

exports.getInspectResult = function(player, obj_id, res) {
    var use_id = exports.getUseId(player, obj_id);
    var use_id = obj_id+use_id
    console.log("INSPECT")
    console.log("ID"+use_id)
    var query = `SELECT inspect_result FROM object_use WHERE use_id = '${use_id}';`;

    client.query(query, function(err, result) {
        console.log(result.rows[0])
        if (result.rows.length === 1) {
            res.end(result.rows[0].inspect_result);
        } else {
            res.end();
        }
    });
};

exports.getAction = function(scene_item, use_id) {
    var query = `SELECT action FROM scene1_interaction WHERE use_id = '${use_id}' AND scene_id = '${scene_item}';`;

    client.query(query, function(err, result) {
        if (result.rows.length === 1) {
            return result.rows[0].action;
        } else {
            return null;
        }
    });
};

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