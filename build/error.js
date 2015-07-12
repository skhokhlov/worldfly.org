var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var csso = require('gulp-csso');

gulp.task('error', function () {
    gulp.src(dirname + '/app/error/error.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(gulp.dest(dirname + '/public/error'));

    var yr = require(dirname + '/node_modules/yate/lib/runtime.js');

    require('child_process').exec(dirname + '/node_modules/yate/yate app/error/error.yate > '
    + dirname + '/public/error/error.yate.js', function (err) {
        if (err) {
            new Error(err);
        }

        writeFile({
            code: 404,
            title: 'Not Found',
            description: '<p>The requested resource was not found.</p>' +
            '<p>You can skip <a href="/">to the main page</a>.</p>' +
            '<p>If you believe that something should be here, ' +
            '<a href="mailto:support@worldfly.info">&#32;please let us know: support@worldfly.info</a>.</p>'
        });

        writeFile({
            code: 500,
            title: 'Internal Server Error',
            description: '<p>The server is unable to process request.</p> ' +
            '<p>You can <a href="mailto:support@worldfly.info">&#32;tell us about it: support@worldfly.info</a>.</p>'
        });

        writeFile({
            code: 503,
            title: 'Service Unavailable',
            description: '<p>The server is temporarily unable to process requests.</p> ' +
            '<p>You can <a href="mailto:support@worldfly.info">&#32;tell us about it: support@worldfly.info</a>.</p>'
        });
    });

    function writeFile(options) {
        require(dirname + '/public/error/error.yate.js');
        require('fs').writeFile(dirname + '/public/error/' + options.code + '.html', yr.run('error', options),
            function (err) {
                if (err) {
                    throw err;
                }
            });
    }

});
