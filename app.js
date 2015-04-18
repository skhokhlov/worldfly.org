'use strict';

var express = require('express'),
    app = express();

app.set('port', process.env.PORT || 3000);


app.use('/public', express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    //checkHost(req.hostname, res, 'https://www.worldfly.org/', function(){
    res.status(200).sendFile(__dirname + '/public/app.html');
    //})
});

app.get('/projects', function (req, res) {
    //checkHost(req.hostname, res, 'https://www.worldfly.org/', function(){
    res.status(200).sendFile(__dirname + '/public/app.html');
    //})
});

app.get('/assest/data.json', function (req, res) {
    //res.status(200).sendFile(__dirname + '/assest/data.json');
    res.status(200).json({
        "data": {
            "ipCountry": req.ips
        },
        "home": {
            "data": {
                "year": new Date().getFullYear()

            },
            "page": {
                "page-blocks": {
                    "header": {
                        "logo": true,
                        "nav": true
                    },
                    "footer": true
                },
                "page-params": {
                    "_page": "home",
                    "title": "Homepage of World Fly"
                }
            }
        },
        "projects": {
            "data": {
                "year": new Date().getFullYear()
            },
            "page": {
                "page-blocks": {
                    "header": {
                        "logo": true,
                        "nav": true
                    },
                    "body": {
                        "projects": true
                    },
                    "footer": true
                },
                "page-params": {
                    "_page": "page",
                    "title": "Projects of World Fly",
                    "header": "Projects"
                },
                "projects":{
                    "list": {
                        "project": [
                            {
                                "title": "Gewefope",
                                "years": {
                                    "begin": 2013,
                                    "end": "∞"
                                },
                                "link": [
                                    {
                                        "href": "https://github.com/gewefope/gewefope",
                                        "body": "Github",
                                        "separator": ". "
                                    },
                                    {
                                        "href": "https://debug.gewefope.com",
                                        "body": "Website",
                                        "separator": "."
                                    }
                                ],
                                "description": "In development. Partly open source. Fully customizable weather forecast."
                            },
                            {
                                "title": "Greengrocery",
                                "years": {
                                    "begin": 2012,
                                    "end": "∞"
                                },
                                "link": [
                                    {
                                        "href": "https://github.com/skhokhlov/greengrocery",
                                        "body": "Github",
                                        "separator": "."
                                    }
                                ],
                                "description": "Open Source CMS on asp.net. To get started you just need to open your browser. One of the most simple and fast content management systems."
                            },
                            {
                                "title": "Blog about IT",
                                "years": {
                                    "begin": 2012
                                },
                                "description": "Closed."
                            },
                            {
                                "title": "Collection of articles on aviation and astronautics",
                                "years": {
                                    "begin": 2008,
                                    "end": 2013
                                },
                                "description": "Closed."
                            },
                            {
                                "title": "News of aviation and astronautics",
                                "years": {
                                    "begin": 2008,
                                    "end": 2012
                                },
                                "description": "Closed. The most interesting news of aviation and astronautics."
                            },
                            {
                                "title": "Photo Album",
                                "years": {
                                    "begin": 2008,
                                    "end": 2013
                                },
                                "description": "Closed."
                            },
                            {
                                "title": "Encyclopedia of aviation and astronautics",
                                "years": {
                                    "begin": 2007,
                                    "end": 2013
                                },
                                "description": "Closed. Science handbook of articles on aerospace engineering."
                            }
                        ]
                    }
                }
            }
        }
    });
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