var gulp = require('gulp');

global.dirname = __dirname;

require('./build/error.js');
require('./build/contrast.js');
require('./build/main.js');

gulp.task('default', ['error', 'contrast', 'main']);