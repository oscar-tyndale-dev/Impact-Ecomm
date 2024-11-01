const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');
const browserSync = require('browser-sync').create();

// Paths
const paths = {
   global: 'scss/global.scss',
   styleSwitch: 'scss/_style-switch.scss',
   dist: 'dist/',
   allScss: 'scss/**/*.scss'
};

// Function to get the included file names from _style-switch.scss
function getIncludedFileNames() {
   const content = fs.readFileSync(paths.styleSwitch, 'utf8');
   const matches = content.match(/@forward\s+['"](.+?)['"]/g);
   if (matches) {
      return matches.map(match => path.basename(match.split(' ')[1].replace(/['"]/g, '')));
   }
   return [];
}

// Compile function
function compileGlobalStyles() {
   const includedFiles = getIncludedFileNames();
   const outputFileName = includedFiles.length ? includedFiles.join('-') + '.css' : 'global.css';

   return gulp.src(paths.global)
      .pipe(sass({
         includePaths: ['scss'],
         sourceMap: true
      }).on('error', function(err) {
         console.log(err.message);
         this.emit('end');
      }))
      .pipe(rename(outputFileName))
      .pipe(gulp.dest(paths.dist))
      .pipe(browserSync.stream());
}

// Watch function
function watch() {
   browserSync.init({
      server: {
         baseDir: './'
      }
   });
   gulp.watch(paths.allScss, compileGlobalStyles);
   gulp.watch('*.html').on('change', browserSync.reload);
}

// Clean task (optional but recommended)
function clean(cb) {
   // Add cleanup logic if needed
   cb();
}

// Gulp default task
exports.default = gulp.series(clean, compileGlobalStyles, watch);