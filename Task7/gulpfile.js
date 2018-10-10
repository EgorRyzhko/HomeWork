var gulp = require('gulp'),
    sass = require('gulp-sass')
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    babel = require('gulp-babel'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
    .pipe(concat('common.min.js'))
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css-files', ['sass'], function() {
    return gulp.src('app/css/*.css')
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('img', function() {
    return gulp.src('app/img/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'css-files', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/css/*.css', browserSync.reload);
});

gulp.task('clean', () => del.sync('dist'));

gulp.task('build', ['clean', 'img', 'scripts', 'css-files'], function() {
    gulp.src('app/js/libs/jquery-3.3.1.min.js')
    .pipe(gulp.dest('dist/js'));
    
    gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('clear', () => cache.clearAll());

gulp.task('default', ['watch']);