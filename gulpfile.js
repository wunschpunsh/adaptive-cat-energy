import gulp from 'gulp';
import browser from 'browser-sync';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import csso from 'postcss-csso';
import htmlmin from 'gulp-htmlmin';
import jsmin from 'gulp-minify';
import squoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import { deleteAsync } from 'del';

// Styles

export const styles = () => {
  return gulp
    .src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

// HTML

const minifyHtml = () => {
  return gulp
    .src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};

// JS

const minifyJs = () => {
  return gulp.src('source/js/*.js').pipe(jsmin()).pipe(gulp.dest('build/js'));
};

// IMAGES

const optimazeImages = () => {
  return gulp
    .src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
};

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}').pipe(gulp.dest('build/img'));
};

// WEBP

const createWebp = () => {
  return gulp
    .src('source/img/**/*.{jpg,png}')
    .pipe(squoosh({ webp: {} }))
    .pipe(gulp.dest('build/img'));
};

// SVG

const svg = () => {
  return gulp
    .src(['source/img/*.svg', '!source/img/sprite/*.svg'])
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'));
};

const sprite = () => {
  return gulp
    .src('source/img/sprite/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({ inLineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
};

// Copy

const copy = (done) => {
  gulp
    .src(
      ['source/fonts/*.{woff,woff2}', 'source/*.ico', 'source/*.webmanifest'],
      { base: 'source' }
    )
    .pipe(gulp.dest('build'));
  done();
};

// Clean

const clean = () => {
  return deleteAsync(['build']);
};

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(minifyHtml, reload));
  gulp.watch('source/js/*.js', gulp.series(minifyJs, reload));
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Build

export const build = gulp.series(
  clean,
  copy,
  optimazeImages,
  gulp.parallel(styles, minifyHtml, minifyJs, svg, sprite, createWebp)
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, minifyHtml, minifyJs, svg, sprite, createWebp),
  gulp.series(server, watcher)
);

// export default gulp.series(
//   gulp.parallel(styles, minifyHtml, minifyJs, sprite),
//   gulp.series(server, watcher)
// );
