module.exports = function (app) {
    var dirname = global.dirname,
        yr = require(dirname + '/node_modules/yate/lib/runtime.js'),
        lib = require('./lib.js'),
        dataAPI = require('./data.js')();


    app.get('/', function (req, res) {
        if (lib.hostAvailability(req.hostname)) {
            res.send(render.home)

        } else {
            res.redirect(301, 'https://www.worldfly.org/');
        }
    });

    app.get('/projects', function (req, res) {
        if (lib.hostAvailability(req.hostname)) {
            res.send(render.projects)

        } else {
            res.redirect(301, 'https://www.worldfly.org/projects');
        }
    });

    app.get('/assest/data.json', function (req, res) {
        res.status(200).set('cache-control', 'public, max-age=120').json(dataAPI);
    });

    require(dirname + '/public/main/app.yate.js');
    var render = {
        "home": null,
        "projects": null
    };

    renderFile(yr.run('app', dataAPI.home)).then(function(data){
        render.home = data;
    }).catch(function(e){
        throw new Error(e);
    });

    renderFile(yr.run('app', dataAPI.projects)).then(function(data){
        render.projects = data;
    }).catch(function(e){
        throw new Error(e);
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

};