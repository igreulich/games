var browserSync = require('browser-sync');
var gulp        = require('gulp');
var uglify      = require('gulp-uglifyjs');
var notify      = require('gulp-notify');
var babel       = require('gulp-babel');
var concat      = require('gulp-concat');
var minifyCSS   = require('gulp-minify-css');
var path        = require('path');
var less        = require('gulp-less');
var autoprefix  = require('gulp-autoprefixer');
var webpack     = require('webpack');
var deploy      = require('gulp-gh-pages');

var reload = browserSync.reload;

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch([
    '*.html',
    'scripts/modules.js/',
    'scripts/app.js',
    'stylesheets/vendor.css',
    'stylesheets/app.css'
  ], {cwd: 'app'}, reload);
});

gulp.task('build:vendor:js', function() {
  gulp.src([
    'bower_components/firebase/firebase.js',
    'bower_components/reactfire/dist/reactfire.js',
    'bower_components/react/react.js',
    'bower_components/react-bootstrap/react-bootstrap.js',
    'node_modules/react-wysiwys/index.js'
  ])
  .pipe(uglify('modules.js', {mangle: false}))
  .pipe(gulp.dest('app/scripts'))
  .pipe(notify({ title: 'Gulp Build', message: 'Finished building vendor js'}));
});

gulp.task('build:vendor:styles', function() {
  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css'
  ])
  .pipe(concat('vendor.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('app/stylesheets'))
  .pipe(notify({title: 'Gulp Build', message: 'Finished building vendor css'}));
});

gulp.task('build:app', function(callback) {
  webpack(require('./webpack.config.js'), function(error, stats) {
    stats = stats.toString();

    if (error) {
      console.log(error);
    }

    console.log(stats);

    callback();
  });
});

gulp.task('build:styles', function() {
  gulp.src([
    'app/stylesheets/less/**/*.less'
  ])
  .pipe(less({
    paths: [path.join(__dirname, 'less', 'includes')]
  }))
  .pipe(concat('app.css'))
  .pipe(autoprefix('last 2 versions'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('app/stylesheets'))
  .pipe(notify({title: 'Gulp Build', message: 'Finished building app css'}));
});

gulp.task('build:fonts', function() {
  gulp.src([
    'bower_components/bootstrap/dist/fonts/*.*'
  ])
  .pipe(gulp.dest('app/fonts'))
  .pipe(notify({title: 'Gulp Build', message: 'Finished building fonts'}));
});

gulp.task('deploy', ['build'], function() {
  gulp.src('./app/**/*')
  .pipe(deploy())
  .pipe(notify({title: 'Gulp Deploy', message: 'Deployed to Github Pages.'}));
});

gulp.task('watch', function() {
  gulp.watch('app/scripts/components/**/*.jsx', ['build:app']);
  gulp.watch('app/stylesheets/less/**/*.less', ['build:styles']);
});

gulp.task('dev', ['build:vendor:js', 'build:vendor:styles', 'build:fonts', 'build:styles', 'build:app', 'watch']);
gulp.task('build', ['build:vendor:js', 'build:vendor:styles', 'build:fonts', 'build:styles', 'build:app']);
