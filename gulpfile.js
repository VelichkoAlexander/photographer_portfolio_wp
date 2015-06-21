'use strict';
var gulp = require('gulp'),
    rename = require("gulp-rename"),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),// Компиляция SCSS
    wiredep = require('wiredep').stream,
    minifyCSS=require('gulp-minify-css'),
    autoprefixer=require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    browserSync = require('browser-sync').create(),//лайв-релоад
    reload = browserSync.reload, //упрощение обращения к релоаду
    jade = require('gulp-jade'); // Компиляция Jade

gulp.task('concatCss', function () {
    gulp.src('app/css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest('out/'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
                 baseDir: "./app"
               }
    });
});

//css
gulp.task('css', function () {
    gulp.src('src/assets/styles/main.css')
        .pipe(rename('style.css'))
        .pipe(gulp.dest('built/css/'))
        .pipe(notify("Css ready!"))
        .pipe(reload({stream: true}));
});

//Собираем Jade
gulp.task('jade', function () {
    gulp.src(['app/jade/*.jade', '!app/jade/_*.jade'])	// Указываем какие файлы нужны
        .pipe(jade({									// Вызываем Jade
            pretty: true								// Делаем красиво и богато, пока что.
        }))
        .pipe(gulp.dest('./app/'))						// Директория куда скидываются готовые файлы
        // .pipe(notify("Jade ready!"))
        .pipe(reload({stream: true}));				// Сервер перезапускаем

});
//Собираем SCSS
gulp.task('sass', function () {
    gulp.src('app/scss/*.scss')
        .pipe(sass({
            errLogToConsole: true,						// показывать ошибки в консоле
            sync: true									// для обработки больших файлов
        }))
//.pipe(minifyCSS())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('app/css/'))					// Директория куда скидываются готовые файлы
        // .pipe(notify("Scss Complete!"))				//Нотификация
        .pipe(reload({stream: true}));					// Сервер перезапускаем
});

//html - при верстке без джейд
gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(notify("Html Complete!"))
        .pipe(reload({stream: true}));
});

//Js
gulp.task('js', function () {
    gulp.src('./app/js/*.js')
        // .pipe(notify("Js Complete!"))
        .pipe(reload({stream: true}));
});

//wiredep
gulp.task('wiredep', function () {
    gulp.src('app/jade/index.jade')
        .pipe(wiredep({
            directory: 'app/components',
            exclude: 'app/components/jquery'           //Исключаем ненужную папку
}))
        .pipe(gulp.dest('app/jade/'))
        .pipe(notify("wiredep include done!"))
});

//watcher
gulp.task('watch', function () {
    gulp.watch('app/css/style.css', ['css']);
    gulp.watch('app/js/*.js', ['js']);
    //gulp.watch('app/*.html', ['html']);
    gulp.watch('app/jade/*.jade', ['jade']);
    gulp.watch('app/scss/**/_*.scss', ['sass']);
    gulp.watch('bower.json', ['wiredep']);
});

//default
gulp.task('dev', ['browser-sync', 'watch']);