import gulp from 'gulp';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';

gulp.task('minify-images', function (done) {
    gulp.src('public/p/**/*.{JPG,jpg,PNG,png,GIF,gif,SVG,svg,JPEG,jpeg}')
		.pipe(imagemin([
			gifsicle({interlaced: true}),
			mozjpeg({quality: 75, progressive: true}),
			optipng({optimizationLevel: 3}),
			svgo({
				plugins: [
					{
						name: 'removeViewBox',
						active: true
					},
					{
						name: 'cleanupIDs',
						active: false
					}
				]
			})
		],{verbose: true}
		))
		.pipe(gulp.dest('public/p/'))
    done();
});

gulp.task('default', gulp.series(gulp.parallel('minify-images')), function () {
    console.info("----------gulp Finished----------");
});
