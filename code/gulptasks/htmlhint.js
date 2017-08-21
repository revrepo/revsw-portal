var gulp = require('gulp');
var path = require('path');
var htmlhint = require('gulp-htmlhint'); // @see https://www.npmjs.com/package/gulp-htmlhint
var devFolder = path.join(__dirname, '..', 'dev');

gulp.task('htmlhint', function() {
  return gulp.src([
    path.join(devFolder, '*.html'),
    path.join(devFolder, 'parts', '**', '*.html'),
    path.join(devFolder, 'parts', '**', '**', '*.html')
    ])
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});
