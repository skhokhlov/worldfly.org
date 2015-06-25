module.exports = function (app, path) {
    app.get('/contrast', function (req, res) {
        if (require('./hostAvailability.js')(req.hostname)) {

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

                        //success(r);

                        require('fs').readFile(path + '/public/contrast.html', {encoding: 'utf-8'}, function (err, data) {
                            if (err) {
                                throw err;
                            }


                            if (r.fail == null) {

                                var l = r.photo.length,
                                    t = '<figure class="b-list__item"><figcaption class="b-list__desrc">{title}</figcaption><img src="{src}" alt="{title}" class="b-list__photo"/></figure>',
                                    img = '';

                                for (var i = 0; i < l; i++) {
                                    img += t.replace('{src}', r.photo[i].url.replace('{size}', ''))
                                        .replace(new RegExp('{title}', 'g'), r.photo[i].title);
                                }

                                res.status(200).send(data.replace('{content}', img));
                            }

                            //res.status(200).send(data.replace('{content}', 'Content!'));
                        });

                        //return r;

                    } else {
                        res.status(503).send('HTTP 503');
                        //error();
                        //return {fail: true};
                        //    res.status(200).json({fail: true});
                    }

                });
            }).end();



            request(function (res) {
                res.status(503).send('HTTP 503');
            }, function (r, res) {
                require('fs').readFile(path + '/public/contrast.html', {encoding: 'utf-8'}, function (err, data) {
                    if (err) {
                        throw err;
                    }


                    if (r.fail == null) {

                        var l = r.photo.length,
                            t = '<figure class="b-list__item"><figcaption class="b-list__desrc">{title}</figcaption><img src="{src}" alt="{title}" class="b-list__photo"/></figure>',
                            img = '';

                        for (var i = 0; i < l; i++) {
                            img += t.replace('{src}', r.photo[i].url.replace('{size}', ''))
                                .replace(new RegExp('{title}', 'g'), r.photo[i].title);
                        }

                        res.status(200).send(data.replace('{content}', img));
                    }

                    //res.status(200).send(data.replace('{content}', 'Content!'));
                });
            });


            //res.status(200).sendFile(path + '/public/contrast.html');

        } else {
            res.redirect(301, 'https://www.worldfly.org/contrast');
        }
    });

    //app.get('/assest/photos.json', function (req, res) {
    //
    //    request(function (res) {
    //        res.status(200).json({fail: true});
    //    }, function (data, res) {
    //        res.status(200).set('cache-control', 'public, max-age=120').json(data);
    //    });
    //
    //
    //});


    function request(error, success) {

    }

};