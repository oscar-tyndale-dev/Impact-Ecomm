const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Paths
const paths = {
   global: 'scss/global.scss', // Entry point for your SCSS
   allScss: 'scss/**/*.scss',  // Pattern to watch all SCSS files
   dist: 'dist/'
};

// Compile function
function compileGlobalStyles() {
   return gulp.src(paths.global) // Compile only the global.scss file
      .pipe(sass({
         includePaths: ['scss'],
         sourceMap: true
      }).on('error', function(err) {
         console.log(err.message);
         this.emit('end');
      }))
      .pipe(gulp.dest(paths.dist)) // Output directly to dist as global.css
}

// Watch function
function watch() {
   gulp.watch(paths.allScss, compileGlobalStyles); // Watch all SCSS files
}

// Clean task (optional but recommended)
function clean(cb) {
   // Add cleanup logic if needed
   cb();
}

// Gulp default task
exports.default = gulp.series(clean, compileGlobalStyles, watch);