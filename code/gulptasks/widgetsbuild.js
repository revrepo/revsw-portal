var gulp = require('gulp');
// var connect = require('gulp-connect');
// var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();
var del = require('del');
var jsReporter = require('jshint-stylish');
var annotateAdfPlugin = require('ng-annotate-adf-plugin');
var path = require('path');
console.log(__dirname);
var widgetDir = path.join(__dirname, '..', 'dev','widgets', 'adf-widget-analytics-proxy-traffic')
var widgetSrcDir = path.join(widgetDir, 'src');
var widgetDistDir = path.join(widgetDir, 'dist');

var pkg = require(widgetDir + '/package.json');

var annotateOptions = {
  plugin: [
    annotateAdfPlugin
  ]
};

var templateOptions = {
  root: '{widgetsPath}/analytics-proxy-traffic/src',
  module: 'adf.widget.analytics-proxy-traffic'
};

/** lint **/

gulp.task('csslint', function() {
  gulp.src(path.join(widgetSrcDir, '**', '*.css'))
    .pipe($.csslint())
    .pipe($.csslint.reporter());
});

gulp.task('jslint', function() {
  gulp.src(path.join(widgetSrcDir, '**', '*.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter(jsReporter));
});

gulp.task('lint', ['csslint', 'jslint']);

/** serve **/

gulp.task('templates', function() {
  return gulp.src(path.join(widgetSrcDir, '**', '*.html'))
    .pipe($.angularTemplatecache('templates.tpl.js', templateOptions))
    .pipe(gulp.dest(path.join(widgetDir, '.tmp', 'dist')));
});

// gulp.task('sample', ['templates'], function() {
//   var files = gulp.src([widgetDir+'src/**/*.js', widgetDir+'src/**/*.css', widgetDir+'src/**/*.less', widgetDir+'.tmp/dist/*.js'])
//     .pipe($.if('*.js', $.angularFilesort()));

//   gulp.src('sample/index.html')
//     .pipe(wiredep({
//       directory: './components/',
//       bowerJson: require('./bower.json'),
//       devDependencies: true,
//       dependencies: true
//     }))
//     .pipe($.inject(files))
//     .pipe(gulp.dest('.tmp/dist'))
//     .pipe(connect.reload());
// });

// gulp.task('watch', function() {
//   gulp.watch(['src/**'], ['sample']);
// });

// gulp.task('serve', ['watch', 'sample'], function() {
//   connect.server({
//     root: ['.tmp/dist', '.'],
//     livereload: true,
//     port: 9002
//   });
// });

/** build **/

gulp.task('css', function() {
  gulp.src([path.join(widgetSrcDir, '**', '*.css'), path.join(widgetSrcDir, '**', '*.less')])
    .pipe($.if('*.less', $.less()))
    .pipe($.concat(pkg.name + '.css'))
    .pipe(gulp.dest(widgetDistDir))
    .pipe($.rename(pkg.name + '.min.css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest(widgetDistDir));
});

gulp.task('js', function() {
  gulp.src([path.join(widgetSrcDir, '**', '*.js'), path.join(widgetSrcDir, '**', '*.html')])
    .pipe($.if('*.html', $.minifyHtml()))
    .pipe($.if('*.html', $.angularTemplatecache(pkg.name + '.tpl.js', templateOptions)))
    .pipe($.angularFilesort())
    .pipe($.if('*.js', $.replace(/'use strict';/g, '')))
    .pipe($.concat(pkg.name + '.js'))
    .pipe($.headerfooter('(function(window, undefined) {\'use strict\';\n', '})(window);'))
    .pipe($.ngAnnotate(annotateOptions))
    .pipe(gulp.dest(widgetDistDir))
    .pipe($.rename(pkg.name + '.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(widgetDistDir));
});

/** clean **/
gulp.task('clean', function(cb) {
  del([widgetDistDir, path.join(widgetDir, '.tmp')], cb);
});

gulp.task('widgets:build', ['css', 'js'],function(cb){
  cb()
});
