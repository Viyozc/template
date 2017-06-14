'use strict';
// npm install --save-dev gulp-watch
var gulp  = require('gulp');
var watch = require('gulp-watch');

var config = require('../config');

gulp.task('data',function () {
  return gulp.src(config.data.src)
             .pipe(gulp.dest(config.data.dest))
});

gulp.task('watch',['es6ToEs5', 'sass','data','img'], function(){

    watch(config.js.es6ToEs5.src, function () {
        gulp.run('es6ToEs5');
    });

    watch(config.css.sass.src, function () {
        gulp.run('sass');
    });

});
