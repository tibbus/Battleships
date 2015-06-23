var gulp = require('gulp');
var gulpLess = require('./gulp/gulpLess');
var gulpBrowserify = require('./gulp/gulpBrowserify');

// load browserify gulp task
gulpBrowserify();

// load less gulp task
gulpLess();


// load all tasks that are needed for the build
gulp.task('build', ['browserify', 'less']);

// also make the build task default, as we don't have other tasks
gulp.task('default', ['browserify', 'less']);

