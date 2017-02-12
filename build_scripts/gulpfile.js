var gulp = require('gulp');

// scripts
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var nunjucks = require('nunjucks');
var nunjucksRender = require('gulp-nunjucks-render');

var sass = require('gulp-sass');
var del  = require('del');
var path = require('path');

var watch = require('gulp-watch');

var config = {
   bowerComponents: '../bower_components/bootstrap',
   distDir: '../dist',
};



var paths = {
   templatesSrc: '../src/templates/',
   fontsSrc: 'src/fonts/',
   sassSrc:  'src/sass/',
   jsSrc:    'src/js/',
   imgSrc:   'src/images/',

   buildDir: '../build/',
   revDir:   '../build/rev/',
   distDir:  '../dist/'
};


gulp.task('clean', function(cb) {
   del([paths.buildDir, paths.distDir], cb);
});


gulp.task('scripts', function() {
   gulp.src([
      '../bower_components/jquery/dist/jquery.js',
      '../bower_components/bootstrap/dist/js/bootstrap.js'
      ])
   .pipe(uglify())
   .pipe(concat('all.js'))
   .pipe(gulp.dest('../dist/js'))
});

gulp.task('css', function() {
   return gulp.src('../src/sass/main.scss')
   .pipe(sass({
      includePaths: ['../bower_components'],
   }))
   .pipe(gulp.dest(config.distDir + '/css'));
});

gulp.task('nunjucks', function () {
   return gulp.src('../src/templates/**/*.html')
   .pipe(nunjucksRender({
path: ['../src/templates/'] // String or Array
}))
   .pipe(gulp.dest('../dist'));
});



gulp.task('watch', function() {
   watch('../src/templates/', function() {
      gulp.run(['css', 'nunjucks']);
   });
});

gulp.task('default', ['css', 'scripts', 'nunjucks', 'watch']);
