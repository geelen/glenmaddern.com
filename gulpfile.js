var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');

/**
 * Serve the Harp Site
 */
gulp.task('serve', function (done) {
  harp.server(__dirname + '/src', {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: false,
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
    gulp.watch("src/**/*.scss", function (e) {
      reload("main.css", {stream: true});
    });
    gulp.watch(["src/**/*.jade", "src/**/*.json"], function (e) {
      reload();
    });
  })
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the harp site, launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);
