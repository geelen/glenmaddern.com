var gulp = require( 'gulp' ),
  $ = require( 'gulp-load-plugins' )(),
  paths = require( './scraping/paths' )

gulp.task( 'jspm-bundle', function () {
  return gulp.src( '' )
    .pipe( $.shell( [
      'jspm bundle-sfx lib/index dist/bundle.js'
    ] ) )
} )

gulp.task( 'bundle', ['jspm-bundle'], function () {
  return gulp.src( 'dist/bundle.js' )
    .pipe( $.uglify() )
    .pipe( gulp.dest( 'dist' ) )
} )

gulp.task( 'snapshots', function () {
  return gulp.src( '' )
    .pipe( $.shell( [
      'node snapshot.js "'+ paths.join(' ') +'"'
    ] ) )
} )

gulp.task( 'assets', function () {
  return gulp.src( 'src/assets/**' )
    .pipe( gulp.dest( 'dist/assets' ) )
} )

gulp.task( 'meta', function () {
  return gulp.src( 'superstatic.json' )
    .pipe( gulp.dest( 'dist' ) )
} )

gulp.task( 'build', ['bundle', 'assets', 'meta', 'snapshots'] )
