
/**
 * Module dependencies.
 */

var express = require('express');

var app = express();


app.set('port', process.env.PORT || 3000);


app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);


app.get('/', function(req, res){
    if(req.host == 'worldfly.info' || req.host == 'www.worldfly.info' || req.host == 'worldfly.org'){
        res.redirect(301, 'https://www.worldfly.org');
    } else{
        if(req.param('_escaped_fragment_') == ''){
            res.status(200).sendfile('noscript/index.html');
        } else {
            res.status(200).sendfile('index.html');
        }
    }
});

app.get('/projects', function(req, res){
    if(req.host == 'worldfly.info' || req.host == 'www.worldfly.info' || req.host == 'worldfly.org'){
        res.redirect(301, 'https://www.worldfly.org/projects');
    } else{
        if(req.param('_escaped_fragment_') == ''){
            res.status(200).sendfile('noscript/projects.html');
        } else {
            res.status(200).sendfile('index.html');
        }
    }
});

app.get('/_/default.css', function(req,res){
    res.status(200).sendfile('dist/default.css');
});

app.get('/_/runtime.js', function(req,res){
    res.status(200).sendfile('dist/runtime.js');
});

app.get('/_/template.js', function(req,res){
    res.status(200).sendfile('dist/template.js');
});

app.get('/_/zepto.js', function(req,res){
    res.status(200).sendfile('dist/zepto.js');
});

app.get('/robots.txt', function(req,res){
    res.status(200).sendfile('robots.txt');
});

app.get('/sitemap.xml', function(req,res){
    res.status(200).sendfile('sitemap.xml');
});

//app.get('/_/cache.manifest', function(req,res){
//    res.status(200).sendfile('_/cache.manifest');
//});

require('http').createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
