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
  
task('css', () => 
  src(css.source)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ grid: 'autoplace' }))
    .pipe(cssnano())
    .pipe(concat('jupiter.min.css'))
    .pipe(dest(css.target))
)

task('default', series(['css']))

task('watch', () => {
  watch(css.source + '/*.css', series('css'))
})
