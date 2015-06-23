var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');


module.exports = function () {
    // add custom browserify options here
    var customOpts = {
        entries: ['./src/app.js'],
        debug: true
    };
    var opts = assign({}, customOpts);
    var b = browserify(opts);

    gulp.task('browserify', bundle);
    b.on('log', gutil.log); // output build logs to terminal

    function bundle() {
        return b.bundle()
          // log errors if they happen
          .on('error', gutil.log.bind(gutil, 'Browserify Error'))
          .pipe(source('bundle.js'))
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
          .pipe(sourcemaps.write('./')) // writes .map file
          .pipe(gulp.dest('./dist'));
    }
}
