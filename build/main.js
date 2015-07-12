var gulp = require('gulp');
var csso = require('gulp-csso');
var shell = require('gulp-shell');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var marked = require('gulp-markdown');
var template = require('gulp-template');
var md5File = require('md5-file');

gulp.task('main-yate', function () {
    gulp.src([dirname + '/app/main/app.yate'])
        .pipe(shell([
            './node_modules/.bin/yate <%= file.path %> > public/main/app.yate.js',
            './node_modules/gulp-uglify/node_modules/uglify-js/bin/uglifyjs public/main/app.yate.js' +
            ' -o public/main/app.yate.js'
        ]));
});

gulp.task('main-css', function () {
    gulp.src(['app/main/app.styl'])
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(gulp.dest('public/main'));
});

gulp.task('main-js', function () {
    gulp.src(['app/main/bootstrap.js', 'app/main/app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest('public/main'));

    gulp.src(['node_modules/yate/lib/runtime.js'])
        .pipe(uglify())
        .pipe(gulp.dest('public/main'));

});

gulp.task('main-markdown', function () {
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
        .pipe(gulp.dest('./projects/build/'));
});

gulp.task('main-yate-dev', function () {
    gulp.src(['app/main/app.yate'])
        .pipe(shell([
            './node_modules/.bin/yate <%= file.path %> > public/main/app.yate.js'
        ]));
});

gulp.task('main-js-dev', function () {
    gulp.src(['app/main/bootstrap.js', 'app/main/app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('public/main'));

    gulp.src(['node_modules/yate/lib/runtime.js'])
        .pipe(gulp.dest('public/main'));

});

gulp.task('main-html', ['main-js', 'main-yate', 'main-markdown', 'main-css'], function () {
    gulp.src(['app/main/app.html'])
        .pipe(template({
            hashAppcss: md5File('public/main/app.css').substring(0, 10),
            hashAppjs: md5File('public/main/app.js').substring(0, 10),
            hashAppyatejs: md5File('public/main/app.yate.js').substring(0, 10),
            hashBootstrap: md5File('public/main/bootstrap.js').substring(0, 10),
            hashRuntime: md5File('public/main/runtime.js').substring(0, 10)
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('public/main'));
});

gulp.task('main-production', ['main-html']);

gulp.task('main', ['main-js-dev', 'main-yate-dev', 'main-markdown', 'main-css'], function () {
    gulp.src(['app/main/app.html'])
        .pipe(template({
            hashAppcss: md5File('public/main/app.css').substring(0, 10),
            hashAppjs: md5File('public/main/app.js').substring(0, 10),
            hashAppyatejs: md5File('public/main/app.yate.js').substring(0, 10),
            hashBootstrap: md5File('public/main/bootstrap.js').substring(0, 10),
            hashRuntime: md5File('public/main/runtime.js').substring(0, 10)
        }))
        .pipe(gulp.dest('public/main'));
});
