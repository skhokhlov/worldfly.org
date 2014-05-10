
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

var app = express();


app.set('port', process.env.PORT || 3000);


app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);


app.get('/', function(req, res){
    if(req.host == 'worldfly.info' || req.host == 'www.worldfly.info' || req.host == 'worldfly.org'){
        res.redirect(301, 'http://www.worldfly.org');
    } else{
    res.status(200).sendfile('index.html');
    }
});

app.get('/projects', function(req, res){
    if(req.host == 'worldfly.info' || req.host == 'www.worldfly.info' || req.host == 'worldfly.org'){
        res.redirect(301, 'http://www.worldfly.org/projects');
    } else{
        res.status(200).sendfile('index.html');
    }
});

app.get('/_/global.css', function(req,res){
    res.status(200).sendfile('_/global.css');
});

app.get('/_/runtime.js', function(req,res){
    res.status(200).sendfile('_/runtime.js');
});

app.get('/_/template.js', function(req,res){
    res.status(200).sendfile('_/template.js');
});

//app.get('/_/cache.manifest', function(req,res){
//    res.status(200).sendfile('_/cache.manifest');
//});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
