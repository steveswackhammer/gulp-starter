// Require Packages
const gulp        = require('gulp'),
    plumber       = require('gulp-plumber'),
    gutil         = require('gulp-util'),    
    concat        = require('gulp-concat'),
    cssmin        = require('gulp-cssmin'),
    rename        = require('gulp-rename'),
    jshint        = require('gulp-jshint'),
    stylish       = require('jshint-stylish'),
    uglify        = require('gulp-uglify'),
    include       = require('gulp-include'),
    sass          = require('gulp-sass'),
    postcss       = require('gulp-postcss'), 
    autoprefixer  = require('autoprefixer'),
    browserSync   = require('browser-sync');

// Styles Task
gulp.task('styles', function(){
  return gulp.src('./src/assets/scss/*.scss')
    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(sass())
    .pipe(postcss([ autoprefixer({browsers: ['last 3 versions'] }) ]))
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/css/'));
});

// Scripts Task
gulp.task('scripts', function(){
  return gulp.src([
      './src/assets/js/plugins.js', 
      './src/assets/js/main.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(include())
      .on('error', console.log)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/js/'));
});

// HTML Task
gulp.task('html', function(){
  return gulp.src('./src/html/*.html')
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest('./dist/'));
});

// Copy Static Assets 
gulp.task('copy', function(){
  gulp.src([
    './src/assets/static/**'
  ])
  .pipe(gulp.dest('./dist/assets/'));

  gulp.src([
    './src/html/*.{txt,ico,png}'
  ])
  .pipe(gulp.dest('./dist/'));  
});

// Watch Task
gulp.task('watch', function(){
  gulp.watch('./src/html/**/*.html', ['html']);
  gulp.watch('./src/assets/js/*.js', ['scripts']);
  gulp.watch('./src/assets/scss/**/*.scss', ['styles']);
  gulp.watch(['./src/assets/static/**', './src/html/*.{txt,ico,png}'], ['copy']);
});

// Browser Sync Task
gulp.task('sync', function() {
    browserSync.init({
        server: {
          baseDir: "./dist"
        },
        // proxy: "",             
        // ghostMode: false      // Uncomment to disable synced scrolling, clicks, etc.
    });

    gulp.watch('./dist/*.html').on('change', browserSync.reload);    
    gulp.watch('./dist/assets/css/*.css').on('change', browserSync.reload);
    gulp.watch('./dist/assets/js/*.css').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['styles', 'scripts', 'html', 'copy', 'watch', 'sync']);

// Build Task (without starting browser-sync server or watch tasks)
gulp.task('build', ['styles', 'scripts', 'html', 'copy']);