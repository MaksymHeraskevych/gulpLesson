const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  sourcemaps = require('gulp-sourcemaps'),
	  concat = require ('gulp-concat'),
	  csso = require ('gulp-csso'),
	  livereload = require('gulp-livereload'),
	  connect = require('gulp-connect');


 function connect() {
  connect.server({
    root: 'app',
    livereload: true
  });
};

function styles() {
  return gulp.src('./app/sass/**/*.sass')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
}

function minifyCSSO() {
    return gulp.src('./app/css/main.css')
        .pipe(csso())
        .pipe(gulp.dest('./app'));
}
 
function development() {
    return gulp.src('./app/css/main.css')
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('./app'));
}

function html() {
	gulp.src('./app/index.html')
	.pipe(connect.reload())
}

function watcher() {
  gulp.watch('./app/sass/**/*.sass', styles)
  gulp.watch('./app/index.html', html)
}


exports.livereload = livereload;
exports.styles = styles;
exports.watcher = watcher;
exports.minifyCSSO = minifyCSSO;
exports.development = development;
exports.html = html;
exports.default = parallel(connect, html, styles, watcher);