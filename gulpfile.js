'use strict';
const { task, src, dest, series, watch } = require('gulp')
const { log } = require('gulp-util')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')

const css = {
  source: './src/sass/main.scss',
  target: './dist/sass/',
}

const js = {
  source: 'src/js',
  target: 'dist/js',
}
  
task('css', () => 
  src(css.source)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ grid: 'autoplace' }))
    .pipe(cssnano())
    .pipe(concat('jupiter.min.css'))
    .pipe(dest(css.target))
)

task('js', () => 
  src([ js.source + '/*.js' ])
    .pipe(uglify({ mangle:true } ).on('error', log))
    .pipe(concat('jupiter.min.js'))
    .pipe(dest(js.target))
)

task('default', series(['css', 'js']))

task('watch', () => {
  watch(css.source + '/*.css', series('css'))
  watch(js.source + '/*.js', series('js'))
})
