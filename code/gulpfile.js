'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
//var vulcanize = require('gulp-vulcanize');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var ngAnnotate = require('gulp-ng-annotate');
var gulpRequireTasks = require('gulp-require-tasks');
var flatten = require('gulp-flatten');

// Call it when neccesary.
gulpRequireTasks({
  // Pass any options to it. Please see below.
  path: __dirname + '/gulptasks' // This is default
});
var devFolder = 'dev/';
var destFolder = './public/';
var bowerComponentsFolder = devFolder + 'bower_components/';

gulp.task('less', function() {
  return gulp.src(devFolder + 'less/styles.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less')]
    }))
    .pipe(gulp.dest(devFolder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('lessVendor', function() {
  return gulp.src(devFolder + 'less/vendors/**.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less')]
    }))
    .pipe(gulp.dest(devFolder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('copyCss', function() {
  console.log(destFolder + 'css');
  return gulp.src([
      devFolder + 'css/**/*.css',
      devFolder + 'css/**/*.{png,gif}'
    ])
    .pipe(gulp.dest(destFolder + 'css'));
});

gulp.task('copyFaviconIcon', function() {
  return gulp.src(devFolder + 'favicon.ico')
    .pipe(gulp.dest(destFolder));
});

gulp.task('copyImages', function() {
  return gulp.src(devFolder + 'images/**/*')
    .pipe(gulp.dest(destFolder + 'images'));
});

gulp.task('copyParts', function() {
  return gulp.src(devFolder + 'parts/**/*.html')
    .pipe(gulp.dest(destFolder + 'parts'));
});

gulp.task('copyJson', function() {
  return gulp.src(devFolder + 'js/**/*.json')
    .pipe(gulp.dest(destFolder + 'js'));
});
// copy production configuration files
gulp.task('copyConfig', function() {
  return gulp.src([
      devFolder + '../config.js',
      devFolder + 'version.txt',
      devFolder + 'robots.txt'
    ])
    .pipe(gulp.dest(destFolder));
});
// copy widgets
gulp.task('widgetsCopy', function() {
  return gulp.src([devFolder + 'widgets/**/dist/**/*.*'])
    .pipe(gulp.dest(destFolder + 'widgets'));
});

// copy custom fonts
gulp.task('copyFonts', function() {
  return gulp.src(devFolder + 'fonts/**/*.*')
    .pipe(gulp.dest(destFolder + 'fonts'));
});

gulp.task('fonts', function() {
  return gulp.src(bowerComponentsFolder + '/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(flatten())
    .pipe(gulp.dest(destFolder + 'fonts'));
});

gulp.task('dist', function() {
  var assets = useref.assets();

  var uglifyOptions = {
    mangle: false //,
    //compress: {
    //  dead_code: false,
    //  hoist_funs: false
    //}
  };
  return gulp.src(devFolder + 'index.html')
    .pipe(assets)
    .pipe(gulpif('*.js', ngAnnotate()))
    .pipe(gulpif('*.js', uglify(uglifyOptions)))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(destFolder));
});

// linting
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
gulp.task('lintjs', function() {
  return gulp.src([
      'gulpfile.js',
      devFolder + 'js/**/*.js'
    ])
    .pipe(jshint({
      linter: 'jshint'
    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('serve:dev', function() {
  var bs1 = require('browser-sync').create();
  var bs2 = require('browser-sync').create();
  bs1.init({
    port: 3000,
    // Disable UI completely
    ui: false,
    server: {
      baseDir: './dev',
      routes: {
        '/bower_components': 'bower_components',
        //'/portal': '/',
        '/widgets': '/../widgets',
      }
    }
  });

  bs2.init({
    port: 4000,
    // Disable UI completely
    // ui: false,
    server: {
      baseDir: './dev',
      routes: {
        '/bower_components': 'bower_components',
        //'/portal': '/',
        '/widgets': '/../widgets',
      }
    }
  });

  gulp.watch([devFolder + '**/*.html',
    devFolder + 'parts/*.html',
    devFolder + 'parts/**/*.html',
    devFolder + 'parts/**/**/*.html'
  ], ['linthtml', reload]);
  gulp.watch([devFolder + 'less/**/*.less'], ['less']);
  gulp.watch([devFolder + 'less/vendors/**.less'], ['lessVendor']);

  gulp.watch([devFolder + 'js/**/*.js'], ['lintjs', reload]);
  gulp.watch([devFolder + 'images/**/*'], reload);
  gulp.watch([devFolder + 'widgets/**/src/*'], ['widgets:build']);
});

gulp.task('serve:public', function() {
  // NOTE: only run public
  browserSync({
    server: {
      baseDir: './public',
      routes: {
        //'/portal': '/public',
        '/widgets': '/public/widgets',
      }
    }
  });
});

gulp.task('serve:coverage', function() {
  // NOTE: Portal app run from dev folder for coverage purposes
  require('./coverage/index').start();
});


gulp.task('copy', ['copyCss', 'copyParts', 'copyFaviconIcon', 'copyImages', 'copyJson', 'copyFonts', 'fonts', 'widgetsCopy', 'copyConfig']);
gulp.task('build', ['less', 'lessVendor', 'copy', 'dist']);
gulp.task('default', ['serve', 'less', 'widgets:build']);
gulp.task('serve', ['serve:dev', 'linthtml']);
gulp.task('public', ['serve:public']);
gulp.task('coverage', ['serve:coverage']);
