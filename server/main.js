module.exports = function (app) {
    var dirname = global.dirname,
        yr = require(dirname + '/node_modules/yate/lib/runtime.js'),
        lib = require('./lib.js'),
        dataAPI = require('./data.js');


    app.get('/', function (req, res) {
        if (lib.hostAvailability(req.hostname)) {
            renderFile(render.home).then(function (data) {
                res.send(data);

            }).catch(function (e) {
                lib.sendError.s500(res);
            });

        } else {
            res.redirect(301, 'https://www.worldfly.org/');
        }
    });

    app.get('/projects', function (req, res) {
        if (lib.hostAvailability(req.hostname)) {
            renderFile(render.projects).then(function (data) {
                res.send(data);

            }).catch(function (e) {
                lib.sendError.s500(res);
            });

        } else {
            res.redirect(301, 'https://www.worldfly.org/projects');
        }
    });

    app.get('/assest/data.json', function (req, res) {
        res.status(200).set('cache-control', 'public, max-age=120').json(dataAPI);
    });

    require(dirname + '/public/app.yate.js');
    var render = {
        "home": yr.run('app', dataAPI.home),
        "projects": yr.run('app', dataAPI.projects)
    };

    /**
     * Render content to app.html
     * @param render
     * @returns {Promise}
     */
    function renderFile(render) {
        return new Promise(function (resolve, reject) {
            require('fs').readFile(dirname + '/public/app.html', {encoding: 'utf-8'}, function (err, data) {
                if (err) {
                    reject(err);
                }

                resolve(data.replace('<div class="b-page__content"></div>', render));

            });
        });
    }
    
};