'use strict';

var express = require('express'),
    app = express();


global.dirname = __dirname;

var lib = require('./server/lib.js');

app.set('port', process.env.PORT || 3000);


app.use('/public', express.static(dirname + '/public', {
    index: false,
    maxAge: ((process.env.DEBUG === 'false') ? 15552000000 : 15000)
}));


require('./server/main.js')(app);

require('./server/contrast.js')(app);

app.get('/favicon.ico', function (req, res) {
    res.status(200).sendFile(dirname + '/public/images/favicon.ico');
});

app.get('/robots.txt', function (req, res) {
    res.set('Content-type', 'text/plain').send(process.env.DEBUG === 'false' ? 'User-Agent: *\nDisallow: /?nojs=true\nDisallow: /projects?nojs=true\nAllow: /\nAllow: /projects\n\nSitemap: https://www.worldfly.org/sitemap.xml\nHost: https://www.WorldFly.org' : 'User-Agent: *\nDisallow: /');
});

app.get('/sitemap.xml', function (req, res) {
    res.set('Content-type', 'application/xml').send('<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    '<url>\n' +
    '<loc>https://www.worldfly.org/</loc>\n' +
    '<lastmod>2015-07-03</lastmod>\n' +
    '<changefreq>monthly</changefreq>\n' +
    '</url>\n' +
    '<url>\n' +
    '<loc>https://www.worldfly.org/projects</loc>\n' +
    '<lastmod>2015-07-03</lastmod>\n' +
    '<changefreq>monthly</changefreq>\n' +
    '</url>\n' +
    '<url>\n' +
    '<loc>https://www.worldfly.org/contrast</loc>\n' +
    '<lastmod>2015-07-03</lastmod>\n' +
    '<changefreq>monthly</changefreq>\n' +
    '</url>\n' +
    '</urlset>\n');
});


app.use(function (req, res) {
    lib.sendError.s404(res);
});

require('http').createServer(app).listen(app.get('port'), function () {
    console.info('DEBUG environment is set to ' + (!!((process.env.DEBUG === 'true') || (process.env.DEBUG == null))));
    console.log('Server listening on port ' + app.get('port'));
});
