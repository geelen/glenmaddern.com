var gulp = require( 'gulp' ),
  $ = require( 'gulp-load-plugins' )(),
  parallelize = require("concurrent-transform"),
  paths = [
    '/',
    '/articles',
    '/articles/interoperable-css',
    '/articles/javascript-in-2015',
    '/articles/introducing-am-css',
    '/articles/metaquery-and-the-end-of-media-queries',
    '/articles/css-filters-gifs-and-performance',
    '/articles/css-modules',
    '/projects',
    '/talks',
    '/work',
    '/slides/interoperable-css',
    '/slides/interoperable-css-eu',
    '/slides/modular-style',
    '/slides/from-extension-to-composition'
  ]

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

gulp.task('publish', function() {
  var aws = require('./aws.json'),
    publisher = $.awspublish.create(aws);

  return gulp.src('dist/**')
      .pipe($.awspublishRouter({
        cache: {
          cacheTime: 31536000
        },
        routes: {
          "^(.*)\\.html$": {
            key: "$1",
            gzip: true,
            headers: {
              "Cache-Control": "public, max-age=1, s-maxage=31536000"
            }
          },
          "^.+$": {
            key: "$&",
            gzip: true
          }
        }
      }))
      .pipe(parallelize(publisher.publish(), 10))
      .pipe(publisher.cache())
      .pipe($.awspublish.reporter());
});
