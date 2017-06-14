'use strict';
var gulp = require('gulp');
var config = require('../config');

var gulpSequence = require('gulp-sequence');
gulp.task('buildSource', gulpSequence(['jsUglify', 'cssToBuild', 'html', 'img']));


gulp.task('app', gulpSequence('buildSource', ['nodeModulesUglify'], ['buildApp']));