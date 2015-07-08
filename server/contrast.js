module.exports = function (app) {
    var lib = require('./lib.js');

    app.get('/contrast', function (req, res) {
        if (lib.hostAvailability(req.hostname)) {
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

                    try {
                        str = JSON.parse(str);
                    } catch (e) {
                        lib.sendError.s500(res);
                    }

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

                        require('fs').readFile(dirname + '/public/contrast/contrast.html', {encoding: 'utf-8'}, function (err, data) {
                            if (err) {
                                lib.sendError.s500(res);
                                throw err;
                            }


                            if (r.fail == null) {

                                var l = r.photo.length,
                                    t = '<figure class="list__item"><figcaption class="list__desrc">{title}</figcaption><img src="{src}" alt="{title}" class="list__photo"/></figure>',
                                    img = '';

                                while (l--) {
                                    img += t.replace('{src}', r.photo[l].url.replace('{size}', ''))
                                        .replace(new RegExp('{title}', 'g'), r.photo[l].title);
                                }

                                res.status(200).send(data.replace('{content}', img));

                            } else {
                                lib.sendError.s503(res);
                            }

                        });

                    } else {
                        lib.sendError.s503(res);
                    }

                });
            }).end();

        } else {
            res.redirect(301, 'https://www.worldfly.org/contrast');
        }
    });

};