'use strict';
// http://www.ituring.com.cn/article/197923
// npm install gulp-uglify --save-dev
// npm install babel-preset-es2015 --save-dev
var gulp = require('gulp');

var plumber = require('gulp-plumber');

// var babelify = require('babelify');
var jsConfig = require('../config').js;
// 方法一
/* es6ToEs5 */
    //npm install gulp-browserify babelify gulp --save-dev
    var browserify = require('gulp-browserify');
    gulp.task('es6ToEs5', function() {
        return gulp.src(jsConfig.es6ToEs5.src)
            .pipe(plumber())
            .pipe(browserify({
                transform: ["babelify"]
            }))
            .pipe(gulp.dest(jsConfig.es6ToEs5.dest));
    });

gulp.task('copy', function () {
   return gulp.src(jsConfig.copyOthers.src)
       .pipe(gulp.dest(jsConfig.copyOthers.dest));
});

var babel  = require("gulp-babel");
/* _es6 */
gulp.task('babel',['copy'], function() {
    return gulp.src(jsConfig.babel.src)
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(jsConfig.babel.dest));
});

gulp.task('nodeModules', function () {
    gulp.src(jsConfig.nodeModules.scr)
        .pipe(plumber())
        .pipe(gulp.dest(jsConfig.nodeModules.dest));
})


/* jsUglify */
// npm install gulp-strip-debug --save-dev 删除目标文件中所有的console.log语句
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
gulp.task('jsUglify', ['es6ToEs5', 'nodeModules', 'copyOthersBuild'], function () {
    // 1. 找到文件
    gulp.src(jsConfig.uglify.src)
        .pipe(plumber())
        //1.1 删除console.log
        .pipe(stripDebug())
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest(jsConfig.uglify.dest));
});


gulp.task('nodeModulesUglify', function () {
// 1. 找到文件
    gulp.src(jsConfig.nodeModulesUglify.src)
        .pipe(plumber())
        //1.1 删除console.log
        .pipe(stripDebug())
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest(jsConfig.nodeModulesUglify.dest));
});