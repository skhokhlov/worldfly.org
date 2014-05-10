var gulp = require('gulp');
var stylus = require('gulp-stylus');
var csso = require('gulp-csso');

    gulp.task('stylus', function () {
        gulp.src('./src/pages/global.styl')
            .pipe(stylus())
            .pipe(csso())
            .pipe(gulp.dest('./_'));
    });





//gulp.task('csso', function() {
//    return gulp.src('./_/global.css')
//        .pipe(csso())
//        .pipe(gulp.dest('./_/global.min.css'));
//});
gulp.task('default', ['stylus']);