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
	combineMq = require('gulp-combine-mq'),
	Pageres = require('pageres');



var vendorsFolder = 'vendors/';

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



gulp.task('scripts', function () {
	return gulp.src(['jquery.gulp-demo.js'])
		//.pipe(jshint('.jshintrc'))
		//.pipe(jshint.reporter('default'))

		.pipe(rename({suffix: '.min'}))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(gulp.dest('js/'))
		.on('error', function (err) {
			console.log(err.message);
		})
		.pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('vendor-scripts', function () {
	return gulp.src([
		vendorsFolder + 'slick/slick.js',
		vendorsFolder + 'shine/shine.js',
		vendorsFolder + 'select-or-die/selectordie.js',
	])
		.pipe(concat('vendor-scripts.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(gulp.dest('js/'))
		.on('error', function (err) {
			console.log(err.message);
		})
		.pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('screenshots', function () {
	var pageres = new Pageres({delay: 2})
		.src('localhost/gulp_demo/', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
		.src('localhost/gulp_demo/2012/01/07/template-sticky/', ['1280x1024', '1920x1080'])
		.dest('screenshots');

	pageres.run(function (err) {
		console.log('done');
	});

});

// Rerun the task when a file changes
gulp.task('watch', function () {
	gulp.watch([ '**/*.less'], ['styles']);
	// gulp.watch(['less/admin-styles.less'], ['admin-styles']);
	gulp.watch(['js/jquery.gulp-demo.js'], ['scripts']);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'styles', 'scripts', 'vendor-scripts' /*, 'admin-styles' */]);