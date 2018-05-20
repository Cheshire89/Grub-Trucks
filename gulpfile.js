var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'scss/*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: 'node ./bin/www'
    });

    gulp.watch([
        'scss/*.scss'
    ], ['sass']);
});

gulp.task('default', ['js','serve']);