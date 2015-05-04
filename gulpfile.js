var gulp = require('gulp'),
    csso = require('gulp-csso'),
    shell = require('gulp-shell'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    marked = require('gulp-marked'),
    template = require('gulp-template'),
    md5File = require('md5-file');

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

gulp.task('freeze', ['html'], function(){
    var fs = require('fs');
    fs.readFile('public/app.html', {encoding: 'utf-8'}, function(err, data){
        if (err) throw err;
        var newData = data.replace('{{hashAppcss}}', '123');
        fs.writeFile('public/app.html', newData, function(err){
          if (err) throw err;
        });
    });
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
        pedantic: true,
        sanitize: true,
        smartLists: true,
        smartypants: true
    }))
    .pipe(gulp.dest('./projects/build/'))
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
        .pipe(template({
            hashAppcss: md5File('public/app.css').substring(0,10),
            hashAppjs: md5File('public/app.js').substring(0,10),
            hashAppyatejs: md5File('public/app.yate.js').substring(0,10),
            hashBootstrap: md5File('public/bootstrap.js').substring(0,10)
        }))
        .pipe(gulp.dest('public'));
});


gulp.task('production', ['yate', 'js', 'css', 'freeze', 'markdown']);
gulp.task('default', ['yate-dev', 'js-dev', 'css', 'html-dev', 'markdown']);
