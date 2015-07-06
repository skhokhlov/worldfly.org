//FIXME: There is memory leak

module.exports = function (app) {
    var dirname = global.dirname,
        yr = require(dirname + '/node_modules/yate/lib/runtime.js'),
        lib = require('./lib.js');

    //Require template
    require(dirname + '/public/main/app.yate.js');

    app.get('/', function (req, res) {
        if (lib.hostAvailability(req.hostname)) {
            renderFile(yr.run('app', dataAPI().home)).then(function (data) {
                res.set('cache-control', 'public, max-age=60').send(data);
            }).catch(function (e) {
                lib.sendError.s500(res);
            });

        } else {
            res.redirect(301, 'https://www.worldfly.org/');
        }
    });

    app.get('/projects', function (req, res) {
        if (lib.hostAvailability(req.hostname)) {
            renderFile(yr.run('app', dataAPI().projects)).then(function (data) {
                res.set('cache-control', 'public, max-age=60').send(data)
            }).catch(function (e) {
                lib.sendError.s500(res);
            });

        } else {
            res.redirect(301, 'https://www.worldfly.org/projects');
        }
    });

    app.get('/assest/data.json', function (req, res) {
        res.status(200).set('cache-control', 'public, max-age=600').json(dataAPI());
    });


    /**
     * Render content to app.html
     * @param render
     * @returns {Promise}
     */
    function renderFile(render) {
        return new Promise(function (resolve, reject) {
            require('fs').readFile(dirname + '/public/main/app.html', {encoding: 'utf-8'}, function (err, data) {
                if (err) {
                    reject(err);
                }

                resolve(data.replace('<div class="b-page__content"></div>', render));

            });
        });
    }

    /**
     * Get file content
     * @param path
     * @returns {*}
     */
    function getFile(path) {
        return require('fs').readFileSync(path, {encoding: 'utf-8'}, function (err, data) {
            if (err) {
                throw err;
            }
            return data;
        });
    }


    function dataAPI() {
        var _data = {
            "year": new Date().getFullYear(),
            "nojs": "false",
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
                                    "title": "Contrast",
                                    "id": "Contrast",
                                    "link": [
                                        {
                                            "href": "/contrast",
                                            "body": "Website",
                                            "separator": ". "
                                        }
                                    ],
                                    "description": getFile('projects/build/contrast.html')
                                    //"description": getFileNew('projects/build/contrast.html').then(function(data){
                                    //    this.description = data;
                                    //})
                                },
                                {
                                    "title": "Yamomof",
                                    "id": "Yamomof",
                                    "years": {
                                        "begin": 2015
                                    },
                                    "link": [
                                        {
                                            "href": "https://github.com/skhokhlov/yamomof",
                                            "body": "Github",
                                            "separator": ". "
                                        }
                                    ],
                                    "description": getFile('projects/build/yamomof.html')
                                },
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
        }
    }

};