var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

gulp.task('server', function(){
    browserSync.init({
        server:{baseDir:'./app/'}
    });
    gulp.watch('app/**/*.html').on('change',browserSync.reload);
    
});
gulp.task('less', function(){
    return gulp.src('./app/less/**/*.less')
    .pipe(plumber({
        errorHandler: notify.onError(function(err){
            return{
                title: 'Styles',
                sound: false,
                message: err.message
            }
        })
    }))
    .pipe(less())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});
gulp.watch('app/less/**/*.less', gulp.series('less'));
gulp.task('default',gulp.series('less', 'server'));