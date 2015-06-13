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
      'node scraping/run-scraper.js'
    ] ) )
} )

gulp.task( 'assets', function () {
  return gulp.src( 'src/assets/**' )
    .pipe( gulp.dest( 'dist/assets' ) )
} )

gulp.task( 'html', ['snapshots', 'assets'], function () {
  return gulp.src( 'scraping/snapshots/*.html' )
    .pipe( $.htmlReplace( {
      'js': ['/bundle.js']
    } ) )
    .pipe( $.rename( function ( file ) {
      var path = paths[parseInt( file.basename )]
      file.basename = path == '/' ? 'index' : path.replace( /^\//, '' )
    } ) )
    .pipe( gulp.dest( 'dist/' ) )
} )

gulp.task( 'build', ['bundle', 'html'] )
