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

app.get('/', function(req,res){
    try{
        var data = replaceVariable("ErrorString", "Не понял - ошибка  500 (Internal Server Error)", "error.html");
        res.setHeader("Content-Type", "text/html").status(500).send(data);
    }
    catch (err){
        console.log(err);
        res.writeHead(500);
        res.end(err);
        return;
    }
});
let loginContent = "Кабердин А.В.";
app.get('/login/', function (req, res) {
    res.setHeader("Content-type", "text/plain");
    res.send(loginContent);
});

app.get('/login/code1', function (req, res) {
    res.sendFile(getPathToHtml("login.html"));
});

app.get('/login/code2', function (req, res) {
    res.setHeader("Content-Type","text/plain").sendFile(getPathToHtml("login.html"));
});

app.get('/login/:id', function (req, res) {
    if(req.params.id == 1){
        res.writeHeader(200, 
            { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*', 
                'X-Author': 'Kaberdin A.V.'
            });
            res.write(JSON.stringify(loginContent));
            res.end();
            return;
    }
    if(req.params.id == 2){
        res.setHeader("Content-Type", "application/json").send(JSON.stringify(loginContent));
    }
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
    try{
        var data = replaceVariable("port",server.address().port,"fetch.html");
        res.setHeader("Content-Type", "text/html").status(200).send(data);
    }
    catch (err){
        console.log(err);
        res.writeHead(500);
        res.end(err);
        return;
    }
});

app.get('/promise/', function(req,res){
    res.send(task.toString());
});

function task(x){
    return myPromise = new Promise((resolve, reject) => {
        if(x < 13){
            resolve('yes');
        } else{
            reject("no");
        }
      });
}

app.use(function(req, res) {
    try{
        var data = replaceVariable("ErrorString","Ужас - ошибка 404 (не найдено)","error.html");
        res.setHeader("Content-Type", "text/html").status(404).send(data);
    }
    catch (err){
        console.log(err);
        res.writeHead(404);
        res.end(err);
        return;
    }
});

var server = http.createServer(app).listen(process.env.PORT || 8005);

if(server == undefined){
    console.log("Node app is not working!");
}
else{
    console.log('Node app is working!');
    console.log('listening on: ', server.address().port);
}

function replaceVariable(variableName, value, htmlFileName){
    var htmlContent = fs.readFileSync(htmlFileName, 'utf-8');

    var regex = new RegExp("\\{\\{"+variableName+"\\}\\}"); 
    htmlContent = htmlContent.toString().replace(regex, value);
    console.log(`RESULT ${htmlContent}`);
    return htmlContent;
}

function getPathToHtml(htmlFileName){
    return path.join(__dirname, `/${htmlFileName}`);
}