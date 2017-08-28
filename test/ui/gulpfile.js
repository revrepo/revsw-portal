var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var gulpIstanbul = require('gulp-istanbul');
var protractor = require('gulp-protractor').protractor;
var webdriverUpdate = require("gulp-protractor").webdriver_update;
var istanbul = require('istanbul');
var rimraf = require('gulp-rimraf');

/* 1. clean out the tmp and coverage directories */
gulp.task('test:clean', function(done) {
  return gulp.src(['tmp','coverage','lcov*'], { read: false })
    .pipe(rimraf({force:true}));
});

function test(cb) {
        gulp.src(['../../code/dev/js/**/*.js'])
            .pipe(gulpIstanbul({includeUntested: true})) // Covering files
            .pipe(gulpIstanbul.hookRequire()) // Force `require` to return covered files
            .on('finish', function () {
                gulp.src(['./suites/functional/admin/**/*.js'])
                    .pipe(protractor({
                      configFile: "./config/protractor.conf.js",
                      args: ['--baseUrl', 'http://127.0.0.1:8000']
                    }))
                    .pipe(gulpIstanbul.writeReports(
                        {
                            dir: './coverage',
                            reporters: ['html', 'lcov', 'json', 'text', 'text-summary', 'cobertura']
                        })) // Creating the reports after tests runned
                    .on('end', cb);
            });
    };

    gulp.task('test:report-coverage', ['test:clean'], function (cb) {
        test(cb);
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