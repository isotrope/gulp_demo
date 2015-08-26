var gulp = require('gulp');
/* var browserify = require('gulp-browserify'); */
var concat = require('gulp-concat'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	notify = require("gulp-notify"),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	combineMq = require('gulp-combine-mq');


gulp.task('styles', function () {
	gulp.src(['style.less'])
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(minifyCSS())
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		//.pipe(combineMq({
		//	beautify: false
		//}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'))
		.pipe(notify({message: 'Styles task complete'}));
});

//gulp.task('admin-styles', function () {
//	gulp.src(['less/admin-styles.less'])
//		.pipe(less())
//		.on('error', notify.onError(function (error) {
//			return error.message;
//		}))
//		.pipe(minifyCSS())
//		.on('error', notify.onError(function (error) {
//			return error.message;
//		}))
//		.pipe(gulp.dest('./'))
//		.pipe(notify({message: 'Admin Styles task complete'}));
//});


gulp.task('scripts', function () {
	return gulp.src(['jquery.gulp-demo.js'])
		//.pipe(jshint('.jshintrc'))
		//.pipe(jshint.reporter('default'))

		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(gulp.dest('js/'))
		.on('error', function (err) {
			console.log(err.message);
		})
		.pipe(notify({message: 'Scripts task complete'}));
});


// Rerun the task when a file changes
gulp.task('watch', function () {
	gulp.watch(['less/*.less', '*.less', 'boostrap/*/*.less'], ['styles']);
	// gulp.watch(['less/admin-styles.less'], ['admin-styles']);
	gulp.watch(['js/jquery.gulp-demo.js'], ['scripts']);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'styles', 'scripts' /*, 'admin-styles' */]);