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
    md5File = require('md5-file');

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
    gulp.src(['app/main/app.html', 'app/404.html', 'app/contrast/contrast.html', 'app/503.html'])
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
    gulp.src(['app/main/app.html', 'app/404.html', 'app/contrast/contrast.html', 'app/503.html'])
        .pipe(template({
            hashAppcss: md5File('public/app.css').substring(0, 10),
            hashAppjs: md5File('public/app.js').substring(0, 10),
            hashAppyatejs: md5File('public/app.yate.js').substring(0, 10),
            hashBootstrap: md5File('public/bootstrap.js').substring(0, 10),
            hashRuntime: md5File('public/runtime.js').substring(0, 10),
            hashContrastCss: md5File('public/contrast.css').substring(0, 10),
            hashContrastJs: md5File('public/contrast.js').substring(0, 10)
        }))
        .pipe(gulp.dest('public'));
});


gulp.task('production', ['yate', 'js', 'css', 'html', 'markdown']);

gulp.task('default', ['yate-dev', 'js-dev', 'css', 'html-dev', 'markdown']);


//gulp.task('freeze', appendHash());
//
//function appendHash() {
//    require('fs').readFile('public/app.html', {encoding: 'utf-8'}, function(err, data){
//        if (err) throw err;
//        var sData = data.toString();
//        var rData = sData.replace('<%= hashAppcss %>', md5File('public/app.css').substring(0, 10))
//            .replace('<%= hashAppjs %>', md5File('public/app.js').substring(0, 10))
//            .replace('<%= hashAppyatejs %>', md5File('public/app.yate.js').substring(0, 10))
//            .replace('<%= hashRuntime %>', md5File('public/runtime.js').substring(0, 10))
//            .replace('<%= hashBootstrap %>', md5File('public/runtime.js').substring(0, 10));
//
//        require('fs').writeFileSync('public/app.html', rData, {encoding: 'utf-8'},function (err) {
//            if (err) throw err;
//        });
//    });
//}