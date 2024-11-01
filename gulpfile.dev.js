"use strict";

var gulp = require('gulp');

var sass = require('gulp-sass')(require('sass')); // Task to compile SCSS to CSS


function compileSass() {
  return gulp.src('scss/**/*.scss') // Adjust path as needed
  .pipe(sass().on('error', sass.logError)).pipe(gulp.dest('css'));
} // Watcher task


function watchSass() {
  gulp.watch('scss/**/*.scss', compileSass);
}

exports["default"] = gulp.series(compileSass, watchSass);