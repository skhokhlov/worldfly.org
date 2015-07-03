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

gulp.task('main-yate', function () {
    gulp.src([dirname + '/app/main/app.yate'])
        .pipe(shell([
            './node_modules/.bin/yate <%= file.path %> > public/main/app.yate.js',
            './node_modules/gulp-uglify/node_modules/uglify-js/bin/uglifyjs public/main/app.yate.js -o public/main/app.yate.js'
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

gulp.task('main-html', function () {
    gulp.src(['app/main/app.html'])
        .pipe(template({
            hashAppcss: md5File('public/app.css').substring(0, 10),
            hashAppjs: md5File('public/app.js').substring(0, 10),
            hashAppyatejs: md5File('public/app.yate.js').substring(0, 10),
            hashBootstrap: md5File('public/bootstrap.js').substring(0, 10),
            hashRuntime: md5File('public/runtime.js').substring(0, 10),
            hashContrastCss: md5File('public/contrast.css').substring(0, 10),
            hashContrastJs: md5File('public/contrast.js').substring(0, 10)
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
        }))
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
        .pipe(gulp.dest('./projects/build/'))
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


gulp.task('main-production', ['main-js','main-yate','main-markdown','main-css'], function(){
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
        .pipe(gulp.dest('public/main'))
        .pipe(gulp.src(['./*/*/*/*', './*/*/*', './*/*', './*'])
            .pipe(zip('release_.zip'))
            .pipe(gulp.dest('./')))
});

gulp.task('main', ['main-js-dev','main-yate-dev','main-markdown','main-css'], function(){
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