
/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
  //, user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('V29ybGQgRmx5IFNlcmdleSBLaG9raGxvdg=='));  //WorldFlySergeyKhokhlov in base64
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/




require('./routes/routes')(app);
//require('./routes/global')(app);

/*
app.get('/', routes.index);
app.get('/users', user.list);*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
