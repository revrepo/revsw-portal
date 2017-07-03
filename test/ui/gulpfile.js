var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var server = require('gulp-serv');
var gulpIstanbul = require('gulp-istanbul');
var protractor = require('gulp-protractor').protractor;
var webdriverUpdate = require("gulp-protractor").webdriver_update;
var path = require('path');
var through = require('through2');
var istanbul = require('istanbul');
var fs = require('fs');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');
/* 1. clean out the tmp and coverage directories */
gulp.task('test:clean', function(done) {
  return gulp.src(['tmp','coverage','lcov*'], { read: false })
    .pipe(rimraf({force:true}));
});

/* 2. copy files over from the app to the temporary webserver directory */
gulp.task('test:files', ['test:clean'], function(done) {
  return gulp.src(['../../code/dev/js/**'])
    .pipe(gulp.dest('tmp/'));
});

/* 3. instrument all javascript files except for vendor ones and copy to temporary webserver directory */
gulp.task('test:instrument', ['test:files'], function(done) {
  return gulp.src(['../../code/dev/**/*.js'])  
    .pipe(mocha({
      reporter: 'spec',
    }))
    // .pipe(uglify())
    .pipe(gulpIstanbul({
        coverageVariable: '__coverage__'
      }))
    .pipe(gulp.dest('tmp/'));
});

/* 4. stand up a temporary web server that serves files out of the temporary directory */
gulp.task('test:server', ['test:instrument'], function(done) {
  server.start({
    root: __dirname + '/tmp',
    host: '0.0.0.0',
    port: 8000
  }, done);
});

/* *. Parrallel task of updating selenium webdriver for protractor */
gulp.task('test:webdriver-update', webdriverUpdate);

/* 5. Run the protractor integration tests, which are configured to use the istanbul coverage plugin */
gulp.task('test:integration',['test:webdriver-update','test:server'], function(done) {
  return gulp.src(["./suites/functional/admin/**/*.js"])
    .pipe(protractor({
      configFile: "./config/protractor.conf.js",
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) { throw e })
});

/* 6. Generate a text-based summary report of the coverage, by scraping in the coverage/*.json files */
gulp.task('test:report-coverage', ['test:integration'], function(done) {
  var collector = new istanbul.Collector();
  var textReport = istanbul.Report.create('text');
  var textSummaryReport = istanbul.Report.create('text-summary');
  var lcovReport = istanbul.Report.create('lcov');

  return gulp.src('./coverage/*.json')
    .pipe(through.obj(function (file, enc, callback) {
        collector.add(JSON.parse(fs.readFileSync(file.path, 'utf8')));
  return callback();
      }))
    .on('end', function () {
      textReport.writeReport(collector,true);
  textSummaryReport.writeReport(collector, true);
  lcovReport.writeReport(collector, true);

  // stopping of the server, as it doesn't die very gracefully
  server.stop();
    });
});





gulp.task('clean', function() {
  return del(['results']);
});

gulp.task('lint', function () {
  return gulp.src([
    './*.js',
    './config/**/*.js',
    './common/**/*.js',
    './page_objects/**/*.js',
    './suites/**/*.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('debugTest', shell.task([
  'node node_modules/.bin/protractor config/debug.js'
]));

gulp.task('smokeTest', shell.task([
  'node node_modules/.bin/protractor config/smoke.js'
]));

gulp.task('smokeTestDomains', shell.task([
  'node node_modules/.bin/protractor config/smokeDomains.js'
]));

gulp.task('regressionTest', shell.task([
  'node node_modules/.bin/protractor config/regression.js'
]));

gulp.task('doc', shell.task([
  'node node_modules/.bin/docker -o results/doc -i config -n',
  'node node_modules/.bin/docker -o results/doc -i common -n',
  'node node_modules/.bin/docker -o results/doc -i page_objects -n'
]));

gulp.task('all', ['clean', 'lint', 'smokeTest', 'regressionTest', 'doc']);

gulp.task('test', ['smokeTest', 'regressionTest']);

gulp.task('default', ['all']);