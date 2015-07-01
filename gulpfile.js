var gulp = require('gulp'),
    csso = require('gulp-csso'),
    shell = require('gulp-shell'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    marked = require('gulp-markdown'),
    template = require('gulp-template'),
    md5File = require('md5-file'),
    zip = require('gulp-zip');

gulp.task('yate', function () {
    gulp.src(['app/main/app.yate'])
        .pipe(shell([
            './node_modules/.bin/yate <%= file.path %> > public/app.yate.js',
            './node_modules/gulp-uglify/node_modules/uglify-js/bin/uglifyjs public/app.yate.js -o public/app.yate.js'
        ]));
});

gulp.task('css', function () {
    gulp.src(['app/main/app.styl', 'app/contrast/contrast.styl'])
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(gulp.dest('public'));
});

gulp.task('js', function () {
    //gulp.src(['app.js'])
    //    .pipe(jshint())
    //    .pipe(jshint.reporter('default'));

    gulp.src(['app/main/bootstrap.js', 'app/main/app.js', 'app/contrast/contrast.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));

    gulp.src(['node_modules/yate/lib/runtime.js'])
        .pipe(uglify())
        .pipe(gulp.dest('public'));

});

gulp.task('html', function () {
    gulp.src(['app/main/app.html', 'app/contrast/contrast.html'])
        //.pipe(template({
        //    hashAppcss: md5File('public/app.css').substring(0, 10),
        //    hashAppjs: md5File('public/app.js').substring(0, 10),
        //    hashAppyatejs: md5File('public/app.yate.js').substring(0, 10),
        //    hashBootstrap: md5File('public/bootstrap.js').substring(0, 10),
        //    hashRuntime: md5File('public/runtime.js').substring(0, 10),
        //    hashContrastCss: md5File('public/contrast.css').substring(0, 10),
        //    hashContrastJs: md5File('public/contrast.js').substring(0, 10)
        //}))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('public'));
});


gulp.task('markdown', function () {
    gulp.src('./projects/*.md')
        .pipe(marked({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: true,
            sanitize: true,
            smartLists: true,
            smartypants: true
        }))
        .pipe(gulp.dest('./projects/build/'))
});


gulp.task('yate-dev', function () {
    gulp.src(['app/main/app.yate'])
        .pipe(shell([
            './node_modules/.bin/yate <%= file.path %> > public/app.yate.js'
        ]));
});

gulp.task('js-dev', function () {
    //gulp.src(['app.js'])
    //    .pipe(jshint())
    //    .pipe(jshint.reporter('default'));

    gulp.src(['app/main/bootstrap.js', 'app/main/app.js', 'app/contrast/contrast.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('public'));

    gulp.src(['node_modules/yate/lib/runtime.js'])
        .pipe(gulp.dest('public'));

});

gulp.task('html-dev', function () {
    gulp.src(['app/main/app.html', 'app/contrast/contrast.html'])
        //.pipe(template({
        //    hashAppcss: md5File('public/app.css').substring(0, 10),
        //    hashAppjs: md5File('public/app.js').substring(0, 10),
        //    hashAppyatejs: md5File('public/app.yate.js').substring(0, 10),
        //    hashBootstrap: md5File('public/bootstrap.js').substring(0, 10),
        //    hashRuntime: md5File('public/runtime.js').substring(0, 10),
        //    hashContrastCss: md5File('public/contrast.css').substring(0, 10),
        //    hashContrastJs: md5File('public/contrast.js').substring(0, 10)
        //}))
        .pipe(gulp.dest('public'));
});


gulp.task('error', function () {
    gulp.src('app/error/error.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(gulp.dest('public/error'));

    var yr = require('./node_modules/yate/lib/runtime.js');


    require("child_process").exec('./node_modules/yate/yate app/error/error.yate > public/error/error.yate.js', function (err) {
        if (err) {
            new Error(err);
        }

        writeFile({
            code: 404,
            title: 'Not Found',
            description: '<p>The requested resource was not found.</p>' +
            '<p>You can skip <a href="/">to the main page</a>.</p>' +
            '<p>If you believe that something should be here, <a href="mailto:support@worldfly.info">&#32;please let us know: support@worldfly.info</a>.</p>'
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
        require(__dirname + '/public/error/error.yate.js');
        require('fs').writeFile('public/error/' + options.code + '.html', yr.run('error', options), function (err) {
            if (err) {
                throw err;
            }
        });
    }

});

//FIXME: Файл открывается и содержимое изменяется, но запись не происходит. Можно попробовать заменить на fs.open
gulp.task('freeze', ['html-dev'], function () {
    require('fs').readFile('public/app.html', {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            throw err;
        }

        var sData = data.toString();
        var rData = sData.replace('<%= hashAppcss %>', md5File('public/app.css').substring(0, 10))
            .replace('<%= hashAppjs %>', md5File('public/app.js').substring(0, 10))
            .replace('<%= hashAppyatejs %>', md5File('public/app.yate.js').substring(0, 10))
            .replace('<%= hashRuntime %>', md5File('public/runtime.js').substring(0, 10))
            .replace('<%= hashBootstrap %>', md5File('public/runtime.js').substring(0, 10))
            .replace('<%= hashContrastCss %>', md5File('public/contrast.css').substring(0, 10))
            .replace('<%= hashContrastJs %>', md5File('public/contrast.js').substring(0, 10));

        require('fs').writeFileSync('public/app.html', rData, {encoding: 'utf-8'}, function (err) {
            if (err) {
                throw err;
            }
        });
    });
});


gulp.task('production', ['yate', 'js', 'css', 'html', 'markdown', 'error'], function () {
    var date = new Date();
    return gulp.src(['./*/*/*/*', './*/*/*', './*/*', './*'])
        .pipe(zip('release_' + date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate() + '_' + date.getHours() + ':' + date.getMinutes() + '.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['yate-dev', 'js-dev', 'css', 'freeze', 'markdown', 'error']);




