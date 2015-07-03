var gulp = require('gulp'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylus = require('gulp-stylus'),
    template = require('gulp-template'),
    autoprefixer = require('gulp-autoprefixer'),
    md5File = require('md5-file');

gulp.task('contrast-css', function () {
    gulp.src([dirname + '/app/contrast/contrast.styl'])
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(gulp.dest(dirname + '/public/contrast'));
});

gulp.task('contrast-js', function () {
    gulp.src([dirname + '/app/contrast/contrast.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest(dirname + '/public/contrast'));
});

gulp.task('contrast-production', ['css', 'js'], function () {
    gulp.src([dirname + '/app/contrast/contrast.html'])
        .pipe(template({
            hashContrastCss: md5File(dirname + '/public/contrast/contrast.css').substring(0, 10),
            hashContrastJs: md5File(dirname + '/public/contrast/contrast.js').substring(0, 10)
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest(dirname + '/public/contrast'));
});


gulp.task('contrast-js-dev', function () {
    gulp.src([dirname + '/app/contrast/contrast.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(dirname + '/public/contrast'));
});

gulp.task('contrast', ['contrast-css', 'contrast-js-dev'], function () {
    gulp.src([dirname + '/app/contrast/contrast.html'])
        .pipe(template({
            hashContrastCss: md5File(dirname + '/public/contrast/contrast.css').substring(0, 10),
            hashContrastJs: md5File(dirname + '/public/contrast/contrast.js').substring(0, 10)
        }))
        .pipe(gulp.dest(dirname + '/public/contrast'));
});

