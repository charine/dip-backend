var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var src = {
    scss: 'examples/assets/scss/*.scss',
    css: 'examples/assets/css',
    html: 'examples/*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', function() {
    browserSync.init({
        server: "docs"
    });

    gulp.watch(src.html).on('change', reload);
    gulp.watch(src.css).on('change', reload);

    gulp.watch(src.scss, gulp.series('sass'));
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css));
});

gulp.task('default', gulp.parallel('serve', 'sass'));


// == ขั้นตอนติดตั้ง gulp ให้ generate file sass -> css และ liverelode ==
//npm install -g gulp <- ถ้าที่เครื่องยังไม่เคยติดตั้ง gulp ต้องติดตั้งแบบ global ก่อน
//npm install --save-dev gulp
//npm install node-sass gulp-sass --save-dev
//npm install browser-sync gulp --save-dev