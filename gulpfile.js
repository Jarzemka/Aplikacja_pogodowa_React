(function (){
    var gulp = require('gulp');
    var gulpSass = require('gulp-sass');
    var gulpSourcemaps = require('gulp-sourcemaps');

    gulp.task('scss', function (){
        return gulp.src('scss/**/*.scss')
        .pipe(gulpSourcemaps.init())
        .pipe(gulpSass({
            errLogToConsole: true,
            outputStyle:"compact"
        }))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest('css'))
    });

    gulp.task('watch', function (){
        gulp.watch('scss/**/*.scss', ['scss']); 
    })

    
})();
