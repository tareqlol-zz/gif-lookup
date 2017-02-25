'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./assets/scss/app.scss')
  	.pipe(sass({includePaths: ['./bower_components']}))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./assets/scss/*.scss', ['sass']);
});