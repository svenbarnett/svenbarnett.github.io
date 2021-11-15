import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

gulp.task('minify-images', function (done) {
    gulp.src('public/p/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest('public/p/'))
    done();
});

gulp.task('default', gulp.series(gulp.parallel('minify-images')), function () {
    console.log("----------gulp Finished----------");
});