var gulp = require('gulp');

global.dirname = __dirname;

require('./build/error.js');
require('./build/contrast.js');
require('./build/main.js');

gulp.task('production', ['error', 'contrast-production', 'main-production']);

gulp.task('default', ['error', 'contrast', 'main']);