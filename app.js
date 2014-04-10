
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

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

//app.get('/_/global.css', function(req, res){
//    res.sendfile('_/global.html');
//});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
