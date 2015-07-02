function getFile(path) {
    return require('fs').readFileSync(path, {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            throw err;
        }
        return data;
    });
}

var _data = {
    "year": new Date().getFullYear(),
    "nojs": "false",
    "debug": process.env.DEBUG
};
var data = {
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
};

module.exports = data;