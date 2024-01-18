const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel', function () {
  return gulp.src('../src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('../dist'));
});
