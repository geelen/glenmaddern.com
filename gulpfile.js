var gulp = require('gulp'),
  $ = require('gulp-load-plugins')();

gulp.task('jspm-bundle', function () {
  return gulp.src('')
    .pipe($.shell([
      'jspm bundle-sfx lib/main dist/bundle.js'
    ]))
})

gulp.task('bundle', ['jspm-bundle'], function () {
  return gulp.src('dist/bundle.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('snapshots', function () {
  return gulp.src('')
    .pipe($.shell([
      'phantomjs scraping/scrape.js http://localhost:1984 "/"'
    ]))
})

gulp.task('html', ['snapshots'], function () {
  return gulp.src('scraping/snapshots/*.html')
    .pipe($.htmlReplace({
      'js': ['bundle.js']
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('build', ['bundle', 'html'])
