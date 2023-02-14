// Gulp Modules
const { src, dest, watch, series, parallel } = require('gulp'),
  minify = require('gulp-minify'),
  sass = require('gulp-sass')(require('sass')),
  clean = require('gulp-clean');

// File paths
const files = {
	scssSrc: 'assets/scss/styles.scss',
  scssWatch: 'assets/scss/**/*.scss',
  scssDest: 'public/build/css/styles.css',

	jsSrc: 'assets/js/scripts.js',
  jsWatch: 'assets/js/**/*.js',
	jsDest: 'public/build/js/scripts.min.js',
}

// Delete minified CSS
function scssClean() {
  return src([files.scssDest])
    .pipe(clean())
}

// Delete minified JavaScript
function jsClean() {
  return src([files.jsDest])
    .pipe(clean())
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
		series(scssClean, jsClean, parallel(scssTask, jsTask))
	)
}

exports.default = series(scssClean, jsClean, parallel(scssTask, jsTask), watchTask)