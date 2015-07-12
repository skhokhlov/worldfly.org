var gulp = require('gulp');
var zip = require('gulp-zip');

global.dirname = __dirname;

require('./build/error.js');
require('./build/contrast.js');
require('./build/main.js');

gulp.task('production', ['error', 'contrast-production', 'main-production'], function () {
    gulp.src(['./*/*/*/*', './*/*/*', './*/*', './*'])
        .pipe(zip('release_.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['error', 'contrast', 'main']);
