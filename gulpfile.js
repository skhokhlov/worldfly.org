var gulp = require('gulp'),
    csso = require('gulp-csso'),
    shell = require('gulp-shell'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

gulp.task('yate', function(){
    gulp.src(['app/app.yate'])
        .pipe(shell([
            './node_modules/.bin/yate <%= file.path %> > public/app.yate.js'
        ]));
});

gulp.task('css', function(){
    gulp.src(['app/app.styl'])
        .pipe(stylus())
        .pipe(csso())
        .pipe(gulp.dest('public'));
});

gulp.task('js', function(){
    //gulp.src(['app.js'])
    //    .pipe(jshint())
    //    .pipe(jshint.reporter('default'));

    gulp.src(['app/bootstrap.js','app/app.js'])
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));

    gulp.src(['node_modules/yate/lib/runtime.js'])
        .pipe(uglify())
        .pipe(gulp.dest('public'));

});



gulp.task('default', ['yate', 'js', 'css']);