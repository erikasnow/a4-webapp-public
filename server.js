var http = require('http')
    , fs = require('fs')
    , url = require('url')
    //, database = require('./database.js')
    , port = 8080;

// Database setup
console.log('connecting to database');
//database.connect();

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
        case '/storyScreen.html':
            sendFile(res, 'storyScreen.html')
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
        case '/js/timer.js':
            sendFile(res, 'js/timer.js', 'text/javascript')
            break
        case '/js/mainScreen.js':
            sendFile(res, 'js/mainScreen.js', 'text/javascript')
            break
        case '/assets/digital-7.regular.ttf':
            sendFile(res, 'js/mainScreen.js')
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
    })
}