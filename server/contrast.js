module.exports = function (app, path) {
    app.get('/contrast', function (req, res) {
        if (require('./hostAvailability.js')(req.hostname)) {
            res.status(200).sendFile(path + '/public/contrast.html');

        } else {
            res.redirect(301, 'https://www.worldfly.org/contrast');
        }
    });

    app.get('/assest/photos.json', function (req, res) {

        var options = {
            host: 'api.flickr.com',
            path: '/services/rest/?method=flickr.photosets.getPhotos&api_key=' + process.env.FLICKR_KEY + '&photoset_id=72157654279469768&format=json&nojsoncallback=1'
        };

        require('https').request(options, function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {

                str = JSON.parse(str);

                if (!(str.stat === 'fail')) {
                    var i = str.photoset.photo.length,
                        r = {
                            photo: new Array(i)
                        };

                    while (i--) {
                        var url = 'https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}{size}.jpg';

                        r.photo[i] = {
                            title: str.photoset.photo[i].title,
                            url: url.replace('{farm-id}', str.photoset.photo[i].farm)
                                .replace('{server-id}', str.photoset.photo[i].server)
                                .replace('{id}', str.photoset.photo[i].id)
                                .replace('{secret}', str.photoset.photo[i].secret)
                        };
                    }

                    res.status(200).set('cache-control', 'public, max-age=120').json(r);

                } else {
                    res.status(200).json({fail: true});
                }

            });
        }).end();

    });
};