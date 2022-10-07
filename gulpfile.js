import gulp from 'gulp';
import browser from 'browser-sync';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

// Styles

export const styles = () => {
  return gulp
    .src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
  gulp.watch('source/js/**/*.js').on('change', browser.reload);
};
// const watcher = () => {
//   gulp.watch('source/sass/**/*.scss', gulp.series(styles));
//   gulp.watch('source/js/main.js', gulp.series(scripts, reload));
//   gulp.watch('source/*.html', gulp.series(html, reload));
// }

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

export default gulp.series(gulp.parallel(styles), gulp.series(server, watcher));
