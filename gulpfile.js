'use strict';
const gulp = require('gulp')
const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream');
const autoprefixer = require('gulp-autoprefixer')

gulp.task( 'workflow', () => 
    gulp
        .src(['./src/sass/**/*.scss'], { base: 'src' } )
        .pipe( sourcemaps.init() )
        .pipe( sass().on('error', sass.logError) )
        .pipe( autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe( cssnano() )
        .pipe( sourcemaps.write('./') )
        .pipe( source('build.css') )
        .pipe( gulp.dest('./dist/css/') )
)

gulp.task( 'default', () => 
    gulp.watch( './src/sass/**/*.scss', gulp.series('workflow') )
)