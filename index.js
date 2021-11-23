const { response } = require('express');
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

app.get('/promise/:id', async function (req, res) {
    if(req.params.id != undefined){
        const reslt = await task(parseInt(req.params.id)).catch((reason)=>{
            res.send(reason);
            return;
        });
        res.send(reslt);
    }
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

var server = http.createServer(app).listen(process.env.PORT || 8005);

if(server == undefined){
    console.log("Node app is not working!");
}
else{
    console.log('Node app is working!');
    console.log('listening on: ', server.address().port);
}
