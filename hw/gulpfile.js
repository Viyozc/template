var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');

var config = {
    css: {
        src: './src/css/*.scss',
        dest: './dist/'
    },
    js: {
        src: './src/js/*.js',
        dest: './dist/'
    }
};

gulp.task('css', function () {
    return gulp.src(config.css.src).pipe(sass.sync().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(config.css.dest));
});

gulp.task('js', ['css'], function () {
    return gulp.src(config.js.src)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('watch', ['js'], function () {
    watch(config.js.src, function () {
        gulp.run('js');
    });

    watch(config.css.src, function () {
        gulp.run('css');
    });
})