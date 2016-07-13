import gulp from 'gulp';
import browser from 'browser-sync';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import browserify from "browserify";
import source from "vinyl-source-stream";
import yaml     from 'js-yaml';
import fs       from 'fs';
import concat from 'gulp-concat';


//Load config variables from config file
function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

//Create variables from loadConfig function
const { PATHS } = loadConfig();

// Start a server with browsersync
function server(done) {
  browser.init({
    server: {
      baseDir: "dist"
    }
  });
  done();
}

//Transpile & Bundle APP JS
function transpile(){
  return browserify('src/js/app.js')
  .transform("babelify")
  .bundle()
  .pipe(source("bundle.js"))
  .pipe(gulp.dest("src/js"));
}

function concatJS() {
  return gulp.src(PATHS.javascript)
  .pipe(concat('app.js'))
  .pipe(gulp.dest('dist/js'));
}

//Transpile SASS
function css(){
  return gulp
      .src('src/sass/*.scss')
      .pipe(sass({
        errLogToConsole: true,
        sourceMap: 'maps',
        includePaths: PATHS.sass
      }))
      .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false,
        map: true
      }))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest('dist/css'))
      .pipe(browser.stream());
}

//Move html files
function html(){
  return gulp
  .src('src/**/*.html')
  .pipe(gulp.dest('dist'));
}

// Watch Files For Changes
function watch() {
  gulp.watch('src/js/**/*.js').on('change', gulp.series(transpile, browser.reload));
  gulp.watch('src/sass/**/*.scss').on('change', gulp.series(css, browser.reload));
  gulp.watch('src/*.html').on('change', gulp.series(html, browser.reload));
}

// Default Task
gulp.task('default',
    gulp.series(css, transpile, concatJS, html, server, watch)
);
