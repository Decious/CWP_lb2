const { response } = require('express');
var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var fs = require('fs');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Author', 'Kaberdin A.V.');
    next();
  });

app.get('/login/', function (req, res) {
    res.send("Kaberdin A.V.");
});

app.get('/login/ru', function (req, res) {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login/by', function (req, res) {
    fs.readFile('login.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(err);
          return;
        }
    
        data = data.toString().replace("<title></title>", "<title>Login by</title>");
        res.writeHead(200);
        res.end(data);
    });
});

app.get('/promise/:id', async function (req, res) {
    if(req.params.id != undefined){
        const reslt = await task(parseInt(req.params.id)).catch((reason)=>{
            res.send(reason);
            return;
        });
        res.send(reslt);
    }
});

app.get('/fetch/', function (req, res){
    fs.readFile('fetch.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(err);
          return;
        }
    
        data = data.toString().replace(/\{\{port\}\}/, server.address().port);
        res.writeHead(200);
        res.end(data, 'utf8');
    });
});

app.get('/promise/', function(req,res){
    res.send(task.toString());
});

function task(x){
    return myPromise = new Promise((resolve, reject) => {
        if(x < 18){
            resolve('yes');
        } else{
            reject("no");
        }
      });
}

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'error.html'));
});

var server = http.createServer(app).listen(process.env.PORT || 8005);

if(server == undefined){
    console.log("Node app is not working!");
}
else{
    console.log('Node app is working!');
    console.log('listening on: ', server.address().port);
}
