var gulp = require('gulp');
var stylus = require('gulp-stylus');
var csso = require('gulp-csso');
var shell = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('stylus', function () {
    gulp.src('./src/default.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(gulp.dest('./dist'));
});

gulp.task('yate-template', function () {
    gulp.src('src/template.yate', {read: false})
        .pipe(shell([
            './node_modules/.bin/yate <%= file.path %> > dist/template.js'
        ]))
});

gulp.task('yate-runtime', function () {
    gulp.src('./node_modules/yate/lib/runtime.js')
        .pipe(shell([
            './node_modules/.bin/uglifyjs <%= file.path %> -o dist/runtime.js'
        ]))
});

gulp.task('default', ['stylus', 'yate-template', 'yate-runtime']);