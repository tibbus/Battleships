var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

module.exports = function () {
    gulp.task('less', function () {
        return gulp.src('./src/style/**/*.less')
          .pipe(less({
              paths: [path.join(__dirname, 'less', 'includes')]
          }))
          .pipe(gulp.dest('./dist/style/'));
    });
};