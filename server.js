var http = require('http')
    , fs = require('fs')
    , url = require('url')
    , database = require('./database.js')
    , port = 8080;

// Database setup
console.log('connecting to database');
database.connect();

console.log('connected to database');

// Upload data (comment out)
//uploadToDatabase("inventory", "data/inventory.json");
//uploadToDatabase("object_use", "data/object_use.json");
//uploadToDatabase("scene1_interaction", "data/scene1_interaction.json");

var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url)

    switch (uri.pathname) {
        case '/':
            sendFile(res, 'index.html')
            break
        case '/index.html':
            sendFile(res, 'index.html')
            break
        case '/mainScreen.html':
            sendFile(res, 'mainScreen.html')
            break
        case '/rulesScreen.html':
            sendFile(res, 'rulesScreen.html')
            break
        case '/tutorialScreen.html':
            sendFile(res, 'tutorialScreen.html')
            break
        case '/endScreen.html':
            sendFile(res, 'endScreen.html')
            break 
        case '/scoreScreen.html':
            sendFile(res, 'scoreScreen.html')
            break
        case '/style.css':
            sendFile(res, 'style.css', 'text/css')
            break
        case '/js/sceneHandler.js':
            sendFile(res, 'js/sceneHandler.js', 'text/javacript')
            break
        case '/js/characterSelection.js':
            sendFile(res, 'js/characterSelection.js', 'text/javacript')
            break
        case '/js/item.js':
            sendFile(res, 'js/item.js', 'text/javascript')
            break
        case '/js/mainScreen.js':
            sendFile(res, 'js/mainScreen.js', 'text/javascript')
            break
        case '/placeholder.jpg':
            sendFile(res, 'placeholder.jpg')
            break
        default:
            res.end('404 not found')
    }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080');

/*------subroutines-------*/
function sendFile(res, filename, contentType) {
    contentType = contentType || 'text/html';

    fs.readFile(filename, function (error, content) {
        res.writeHead(200, { 'Content-type': contentType })
        res.end(content, 'utf-8')
    });
}

function uploadToDatabase(table, filename) {
    var stream = fs.createReadStream(filename);

    console.log('reading data from stream...');

    stream.on('data', function (data) {
        if (table === "inventory") {
            database.uploadToInventory(JSON.parse(data));
        } else if (table === "object_use") {
            database.uploadToObjectUse(JSON.parse(data));
        } else {
            database.uploadToScene1(JSON.parse(data));
        }

        console.log(JSON.parse(data));
    });

    stream.on('end', function (data) {
        return;
    });
}