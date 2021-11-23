var express = require('express');
var http = require('http');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var server = http.createServer(app).listen(process.env.PORT || 8005);

if(server == undefined){
    console.log("Node app is not working!");
}
else{
    console.log('Node app is working!');
    console.log('listening on: ', server.address().port);
}
