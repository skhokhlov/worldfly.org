'use strict';

var express = require('express'),
    app = express(),
    yr = require(__dirname + '/node_modules/yate/lib/runtime.js');

app.set('port', process.env.PORT || 3000);


app.use('/public', express.static(__dirname + '/public', {index: false, maxAge: ((process.env.DEBUG === 'false') ? 15552000000 : 15000)}));

app.get('/', function (req, res) {
    if (hostAvailability(req.hostname)) {
        if (req.query._escaped_fragment_ == '') {
            res.send(render.js.home);
        } else if (req.query.nojs == 'true') {
            res.send(render.nojs.home);
        } else {
            res.status(200).sendFile(__dirname + '/public/app.html');
        }
    } else {
        res.redirect(301, 'https://www.worldfly.org/');
    }
});

app.get('/projects', function (req, res) {
    if (hostAvailability(req.hostname)) {
        if (req.query._escaped_fragment_ == '') {
            res.send(render.js.projects);
        } else if (req.query.nojs == 'true') {
            res.send(render.nojs.projects);
        } else {
            res.status(200).sendFile(__dirname + '/public/app.html');
        }
    } else {
        res.redirect(301, 'https://www.worldfly.org/projects');
    }
});


app.get('/assest/data.json', function (req, res) {
    res.status(200).set('cache-control', 'public, max-age=120').json(getData());
});

app.get('/favicon.ico', function (req, res) {
    res.status(200).sendFile(__dirname + '/public/images/favicon.ico');
});

app.get('/robots.txt', function (req, res) {
    res.set('Content-type', 'text/plain').send(process.env.DEBUG === 'false' ? 'User-Agent: *\nDisallow: /?nojs=true\nDisallow: /projects?nojs=true\nAllow: /\nAllow: /projects\n\nSitemap: https://www.worldfly.org/sitemap.xml\nHost: https://www.WorldFly.org' : 'User-Agent: *\nDisallow: /');
});

app.get('/sitemap.xml', function (req, res) {
    res.set('Content-type', 'application/xml').send('<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n' +
    '<url> \n' +
    '<loc>https://www.worldfly.org/</loc> \n' +
    '<lastmod>2015-5-11T13:29:09+00:00</lastmod> \n' +
    '<changefreq>monthly</changefreq> \n' +
    '</url> \n' +
    '<url> \n' +
    '<loc>https://www.worldfly.org/projects</loc> \n' +
    '<lastmod>2015-5-11T13:29:09+00:00</lastmod> \n' +
    '<changefreq>monthly</changefreq> \n' +
    '</url> \n' +
    '</urlset>');
});


app.get('/info', function(req,res){
    res.send(require('os').hostname());
});


app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

require('http').createServer(app).listen(app.get('port'), function () {
    console.info('DEBUG environment is set to ' + (!!((process.env.DEBUG === 'true') || (process.env.DEBUG == null))));
    console.log('Server listening on port ' + app.get('port'));
});


require(__dirname + '/public/app.yate.js');
var render = {
    "nojs": {
        "home": yr.run('app', getData('nojs').home),
        "projects": yr.run('app', getData('nojs').projects)
    },
    "js": {
        "home": yr.run('app', getData().home),
        "projects": yr.run('app', getData().projects)
    }
};


function hostAvailability(host) {
    return !(host === 'worldfly.info' || host === 'www.worldfly.info' || host === 'worldfly.org');
}

function getFile(path) {
  return require('fs').readFileSync(path, {encoding: 'utf-8'}, function (err, data) {
    if (err) throw err;
    return data;
  });
}

function getData(env) {
    var _data = {
        "year": new Date().getFullYear(),
        "nojs": (env === 'nojs' ? "true" : "false"),
        "debug": process.env.DEBUG
    };
    return {
        "home": {
            "data": _data,
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
            "data": _data,
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
                "projects": {
                    "list": {
                        "project": [
                            {
                                "title": "WalletMap",
                                "id": "WalletMap",
                                "years": {
                                    "begin": 2015
                                },
                                "description": getFile('projects/build/walletmap.html')
                            },
                            {
                                "title": "Gewefope",
                                "id": "Gewefope",
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
                                        "href": "https://gewefope.worldfly.org",
                                        "body": "Website",
                                        "separator": "."
                                    }
                                ],
                                "description": getFile('projects/build/gewefope.html')
                            },
                            {
                                "title": "Greengrocery",
                                "id": "Greengrocery",
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
                                "description": getFile('projects/build/greengrocery.html')
                            },
                            {
                                "title": "Blog about IT",
                                "years": {
                                    "begin": 2012
                                },
                                "description": getFile('projects/build/blog_about_it.html')
                            },
                            {
                                "title": "Collection of articles on aviation and astronautics",
                                "years": {
                                    "begin": 2008,
                                    "end": 2013
                                },
                                "description": getFile('projects/build/collection_of_articles_on_aviation_and_astronautics.html')
                            },
                            {
                                "title": "News of aviation and astronautics",
                                "years": {
                                    "begin": 2008,
                                    "end": 2012
                                },
                                "description": getFile('projects/build/news_of_aviation_and_astronautics.html')
                            },
                            {
                                "title": "Photo Album",
                                "years": {
                                    "begin": 2008,
                                    "end": 2013
                                },
                                "description": getFile('projects/build/photo_album.html')
                            },
                            {
                                "title": "Encyclopedia of aviation and astronautics",
                                "years": {
                                    "begin": 2007,
                                    "end": 2013
                                },
                                "description": getFile('projects/build/encyclopedia_of_aviation_and_astronautics.html')
                            }
                        ]
                    }
                }
            }
        }
    };
}
