const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Paths
const paths = {
   general: 'general-styles/**/*.scss',
   siteSpecific: 'sites/**/*.scss',
   dist: 'dist/'
};

// Compile function
function compileSiteStyles() {
   return gulp.src(paths.siteSpecific)
      .pipe(sass({
         includePaths: ['general-styles'],
         sourceMap: true
      }).on('error', function(err) {
         console.log(err.message);
         this.emit('end');
      }))
      .pipe(gulp.dest(paths.dist));
}

// Watch function
function watch() {
   gulp.watch([paths.general, paths.siteSpecific], compileSiteStyles);
}

// Clean task (optional but recommended)
function clean(cb) {
   // Add cleanup logic if needed
   cb();
}

// Gulp default task
exports.default = gulp.series(clean, compileSiteStyles, watch);