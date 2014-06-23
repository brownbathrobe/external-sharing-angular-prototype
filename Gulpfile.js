var gulp = require('gulp');
var gutil = require('gulp-util');
var templateCache = require('gulp-angular-templatecache');
var lr = require('tiny-lr');
var server = lr();
var refresh = require('gulp-livereload');
var spawn = require('child_process').spawn;

gulp.task('default', function () {
  gulp.src(['./public/**/*.html', '!./public/vendor/**', '!./public/index.html'])
    .pipe(templateCache({
      module: "esTemplates",
      standalone: true,
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('lr-server', function() {
  server.listen(35729, function(err) {
    gutil.log('===================>');
    if (err) {
      gutil.log(gutil.colors.red('ERROR'), err);
      return;
    }
  });
});

gulp.task('nodemon', function(cb) {
  spawn('nodemon', ['--watch', 'server', './server.js', '--ext','js'], {
    stdio: 'inherit'
  })
    .on('close', function() {
      cb();
    });
});

gulp.task('tester', function() {
  gulp.run.apply(gulp, ['lr-server', 'nodemon']);
  gulp.watch('./public/js/**/*.js', function (evt) {
    gutil.log(gutil.colors.cyan('js'), 'changed', gutil.colors.gray(evt.path));
    server.changed({
      body: { files: [evt.path] }
    });
  });
});
