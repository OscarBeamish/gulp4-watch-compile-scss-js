// Gulp Modules
const { src, dest, watch, series, parallel } = require('gulp');
const minify = require('gulp-minify')
const sass = require('gulp-sass')(require('sass'));


// File paths
const files = {
	scssSrc: 'assets/scss/styles.scss',
  scssWatch: 'assets/scss/**/*.scss',
  scssDest: 'public/build/css/styles.css',

	jsSrc: 'assets/js/scripts.js',
  jsWatch: 'assets/js/**/*.js',
	jsDest: 'public/build/js/scripts.min.js',
}

// Package, compile and minify Sass
function scssTask() {
  return src([files.scssSrc])
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(dest(files.scssDest))
}

// Package and minify JavaScript
function jsTask() {
  return src([files.jsSrc])
    .pipe(minify({
        ext:{
            min:'.js'
        },
        noSource: true
    }))
    .pipe(dest(files.jsDest))
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
	watch(
		[files.scssWatch, files.jsWatch],
		series(parallel(scssTask, jsTask))
	)
}


exports.default = series(parallel(scssTask, jsTask), watchTask);