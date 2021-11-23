var express = require('express');
var http = require('http');
var app = express();
var path = require('path');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next();
  });

app.get('/login/', function (req, res) {
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
