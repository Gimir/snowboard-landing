var src = require('gulp').src;
var parallel = require('gulp').parallel;
var series = require('gulp').series;
var dest = require('gulp').dest;
var watch = require('gulp').watch;
var cssnano = require('cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');



const scssPath = 'app/scss/*.scss';
const jsPath = 'app/js/*.js';

var cbString = new Date().getTime();
const cacheBustTask = () => {
  return src(['index.html'])
    .pipe(replace(/cb=\d+/, 'cb=' + cbString))
    .pipe(gulp.dest('.'));
}

const scssTask = () => {
  return src(scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('docs/css'));
}
const jsTask = () => {
  return src(jsPath)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

const watchTask = () => {
   watch(
    [scssPath],
    parallel(scssTask)
  );
};

exports.default = series(
  parallel(scssTask),
  watchTask
);
