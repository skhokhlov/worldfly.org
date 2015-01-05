'use strict';

var express = require('express'),
    app = express();

app.set('port', process.env.PORT || 3000);


app.use('/public', express.static(__dirname + '/app/public'));


app.get('/', function (req, res) {
    //checkHost(req.hostname, res, 'https://www.worldfly.org/', function(){
    //console.info(req.hostname);
    res.status(200).sendFile(__dirname + '/app/app.html');
    //})
});

app.get('/assest/data.json', function(req,res){
    res.send('{"data":"null"}');
});

require('http').createServer(app).listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});


//var checkHost = function () {
//    //var host = arguments[0],
//    //    response = arguments[1],
//    //    errorRedirect = arguments[2],
//    //    successCallback = arguments[3]
//    //    ;
//
//    if (host == 'worldfly.info' || host == 'www.worldfly.info' || host == 'worldfly.org') {
//        response.redirect(301, errorRedirect);
//    } else {
//        successCallback();
//    }
//
//};