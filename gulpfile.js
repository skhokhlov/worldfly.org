var gulp = require('gulp'),
    csso = require('gulp-csso'),
    shell = require('gulp-shell'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    marked = require('gulp-marked');

gulp.task('yate', function(){
    gulp.src(['app/app.yate'])
        .pipe(shell([
            './node_modules/.bin/yate <%= file.path %> > public/app.yate.js',
            './node_modules/gulp-uglify/node_modules/uglify-js/bin/uglifyjs public/app.yate.js -o public/app.yate.js'
        ]));
});

gulp.task('css', function(){
    gulp.src(['app/app.styl'])
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(gulp.dest('public'));
});

gulp.task('js', function(){
    //gulp.src(['app.js'])
    //    .pipe(jshint())
    //    .pipe(jshint.reporter('default'));

    gulp.src(['app/bootstrap.js','app/app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));

    gulp.src(['node_modules/yate/lib/runtime.js'])
        .pipe(uglify())
        .pipe(gulp.dest('public'));

});

gulp.task('html', function() {
    gulp.src(['app/app.html', 'app/404.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('public'));
});


gulp.task('markdown', function() {
  gulp.src('./projects/*.md')
    .pipe(marked({
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    }))
    .pipe(gulp.dest('./projects/'))
});


gulp.task('yate-dev', function(){
    gulp.src(['app/app.yate'])
        .pipe(shell([
            './node_modules/.bin/yate <%= file.path %> > public/app.yate.js'
        ]));
});

gulp.task('js-dev', function(){
    //gulp.src(['app.js'])
    //    .pipe(jshint())
    //    .pipe(jshint.reporter('default'));

    gulp.src(['app/bootstrap.js','app/app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('public'));

    gulp.src(['node_modules/yate/lib/runtime.js'])
        .pipe(gulp.dest('public'));

});

gulp.task('html-dev', function() {
    gulp.src(['app/app.html', 'app/404.html'])
        .pipe(gulp.dest('public'));
});


gulp.task('production', ['yate', 'js', 'css', 'html', 'markdown']);
gulp.task('default', ['yate-dev', 'js-dev', 'css', 'html-dev', 'markdown']);
