var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var {series} = require('gulp');
var concat = require('gulp-concat');

exports.sass = function () {
  return gulp.src('src/assets/stylesheets/sass/*.scss')
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('src/assets/stylesheets/css'));
}

exports.imagemin = function(){
  return gulp.src('src/assets/images/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('src/assets/images'));
}
