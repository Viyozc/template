'use strict';
var gulp = require('gulp');
var config = require('../config');

// npm install gulp-clean --save-dev
var clean = require('gulp-clean');//清空文件夹
gulp.task('clean',function(){
    return gulp.src(config.clean.src,{read:false})
        .pipe(clean());
});