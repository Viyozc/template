var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssgrace  = require('cssgrace');
var cssnext  = require('cssnext');
gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 3 version'],
            cascade: false,
            remove: false
        }),
        cssnext(),
        cssgrace
    ];
    return gulp.src('./src/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});
gulp.task('watch', function(){
    gulp.watch('./src/css/*.css', ['css']);
});
gulp.task('default', ['watch', 'css']);

/* 配置 package.json
 {
 "name": "postcss usage",
 "version": "1.0.0",
 "description": "postcss cssnext",
 "main": "gulpfile.js",
 "dependencies": {
 "autoprefixer": "^5.2.0",
 "autoprefixer-core": "^5.2.1",
 "cssgrace": "^2.0.2",
 "gulp": "^3.9.0",
 "gulp-less": "^3.0.3"
 },
 "devDependencies": {
 "autoprefixer": "^5.2.0",
 "autoprefixer-core": "^5.2.1",
 "cssgrace": "^2.0.2",
 "cssnext": "^1.8.4",
 "gulp-postcss": "^6.0.0",
 "postcss": "^4.1.16"
 },
 "scripts": {
 "test": "echo \"Error: no test specified\" && exit 1"
 },
 "keywords": [
 "postcss",
 "gulp"
 ],
 "author": "givebest",
 "license": "ISC"
 }
 */