'use strict';
const gulp = require('gulp')
const gutil = require('gulp-util')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream');
const autoprefixer = require('gulp-autoprefixer')

const css = {
  source: 'src/css',
  target: 'dist/css'
}

const js = {
  source: 'src/js',
  target: 'dist/js'
}

gulp.task('css', () => {
    return gulp
      .src([
          css.source + '/*.css'
      ])
      .pipe( sourcemaps.init() )
      .pipe( sass().on('error', sass.logError) )
      .pipe( autoprefixer({
        grid: 'autoplace'
      }))
      .pipe( cssnano() )
      .pipe( sourcemaps.write('./') )
      .pipe( concat('jupiter.min.css') )
      .pipe( gulp.dest(css.target) )
})

gulp.task('js', () => {
  return gulp
    .src([
      js.source + '/*.js'
    ])
    .pipe( uglify({mangle:true} ).on( 'error', gutil.log ))
    .pipe( concat('jupiter.min.js') )
    .pipe( gulp.dest(js.target) )
})

gulp.task('default', gulp.series(['css', 'js']))

gulp.task('watch', () => {
  gulp.watch( css.source + '/*.css', ['css'] )
  gulp.watch( js.source + '/*.js', ['js'] )
})
