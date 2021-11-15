import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

gulp.task('minify-images', function (done) {
    gulp.src('public/p/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/p/'))
    done();
});

gulp.task('default', gulp.series(gulp.parallel('minify-images')), function () {
    console.log("----------gulp Finished----------");
});