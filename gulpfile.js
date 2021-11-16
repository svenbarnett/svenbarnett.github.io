import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

gulp.task('minify-images', function (done) {
    gulp.src('public/p/**/*.{JPG,jpg,PNG,png,GIF,gif,SVG,svg,JPEG,jpeg}')
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			usa:[pngquant()]
		}))
		.pipe(gulp.dest('public/p/'))
    done();
});

gulp.task('default', gulp.series(gulp.parallel('minify-images')), function () {
    console.info("----------gulp Finished----------");
});
