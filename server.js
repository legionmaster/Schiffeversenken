var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
console.log("Server listens on localhost:8080");
app.listen(8080);
