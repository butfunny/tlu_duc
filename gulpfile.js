var gulp = require('gulp');
//var gutil = require('gulp-util');
//var bower = require('bower');
//var concat = require('gulp-concat');
//var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
////var sh = require('shelljs');
var $q = require("q");
var crypto = require('crypto');


//var paths = {
//  sass: ['./scss/**/*.scss']
//};

//gulp.task('default', ['sass']);


var nodemon = require('gulp-nodemon');
gulp.task('start-server', function () {

	nodemon({
		script: 'server.js',
		ext: 'js',
		"ignore": [
			".idea/",
			".git/",
			"build/",
			"doc/",
			"node_modules/",
			"src/app-backend/public",
			"src/app-frontend/public"
		],
		env: { 'NODE_ENV': 'development' }
	});

	//open("http://localhost:2000");
});

gulp.task('create-user-admin', function() {
	var mongoose = require('mongoose');
	var db = mongoose.connect('mongodb://localhost:27017/tlctf');

	var injector = require("./common/injector").createInjector();
	require('./dao/user-admin-dao')(injector);

	var config = require("./config");

	injector.run(function(UserAdminDao) {
		UserAdminDao.remove({}, function () {
			UserAdminDao.create({username: config.adminUser.username, password: crypto.createHash('md5').update(config.adminUser.password).digest("hex")}, function() {

			});
		})

	});

	injector.runAll();
});


gulp.task('compile-frontend-sass', function () {
	var sass = require('gulp-sass');

	var compileSass = function () {
		console.log("Compiling sass files");

		return gulp.src('./app/assets/scss/app.scss')
			.pipe(sass())
			.on('error', sass.logError)
			.pipe(gulp.dest('./app/assets/css/'))
		//.pipe(minifyCss({
		//    keepSpecialComments: 0
		//}))
		//.pipe(rename({ extname: '.min.css' }))
		//.pipe(gulp.dest('./www/assets/css/'));
	};
	injectScss().then(function () {
		gulp.watch(['./app/angular/**/*.scss', './app/assets/scss/**/*.scss'], compileSass);
		compileSass();
	});


	console.log("Watching scss files");
});

function injectScss() {
	var sort = require('gulp-sort');
	var inject = require('gulp-inject');
	var angularSass = './app/angular/**/*.scss';

	var defer = $q.defer();
	var target = './app/assets/scss/app.scss';
	var sources = gulp.src([angularSass, "!" + target], {read: false}).pipe(sort());

	gulp.src(target).pipe(inject(sources, {
			//ignorePath: "/www/angular",
			starttag: "// inject:start",
			endtag: "// inject:end",
			transform: function (filepath, file, i, length) {
				if (new RegExp("/_[^/]+\\.scss$").test(filepath)) {
					return null;
				}
				return "@import \"../../" + filepath.replace(new RegExp("^/app/"), "") + "\";";
			}
		}))
		.pipe(gulp.dest('./app/assets/scss'))
		.on("end", function () {
			console.log("Injected scss files");
			defer.resolve();
		})
	;
	return defer.promise;
}



gulp.task('inject-js', function () {
	return $q.all([injectPublicFrontEndJs(), injectPublicBackEndJs(), injectServerBackEndJs()]);
});

function injectPublicFrontEndJs() {
	var sort = require('gulp-sort');
	var inject = require('gulp-inject');

	var defer = $q.defer();
	var sources = gulp.src('./src/app-frontend/public/angular/**/*.js', {read: false}).pipe(sort());

	gulp.src("./src/app-frontend/public/index.html").pipe(inject(sources, {
			//ignorePath: "/www",
			starttag: "<!-- inject:spa-js-start -->",
			endtag: "<!-- inject:spa-js-end -->",
			transform: function (filepath, file, i, length) {
				return "<script src=\"" + filepath.replace(new RegExp("^/"), "").substring(24, filepath.length) + "\"></script>";
			}
		}))
		.pipe(gulp.dest('./src/app-frontend/public'))
		.on("end", function () {
			console.log("Injected public js files");
			defer.resolve();
		})
	;
	return defer.promise;
}



function injectPublicBackEndJs() {
	var sort = require('gulp-sort');
	var inject = require('gulp-inject');

	var defer = $q.defer();
	var sources = gulp.src('./src/app-backend/public/angular/**/*.js', {read: false}).pipe(sort());

	gulp.src("./src/app-backend/public/index.html").pipe(inject(sources, {
		//ignorePath: "/www",
		starttag: "<!-- inject:spa-js-start -->",
		endtag: "<!-- inject:spa-js-end -->",
		transform: function (filepath, file, i, length) {
			return "<script src=\"" + filepath.replace(new RegExp("^/"), "").substring(23, filepath.length) + "\"></script>";
		}
	}))
		.pipe(gulp.dest('./src/app-backend/public'))
		.on("end", function () {
			console.log("Injected public js files");
			defer.resolve();
		})
	;
	return defer.promise;
}


function injectServerBackEndJs() {
	var sort = require('gulp-sort');
	var inject = require('gulp-inject');

	var defer = $q.defer();
	var sources = gulp.src(['./src/app-backend/controllers/*.js','./dao/*.js','./src/app-backend/security/*.js'], {read: false}).pipe(sort());

	gulp.src("./src/app-backend/app-backend.js").pipe(inject(sources, {
		//ignorePath: "/www",
		starttag: "//injector server backend js start",
		endtag: "//injector server backend js end",
		transform: function (filepath, file, i, length) {
			var arr = filepath.split("/");
			var f = arr[arr.length - 1];
			var folder = arr[arr.length - 2];
			if (folder == "dao") {
				return "require(\"" + "../../" + folder + "/" + f + "\")(injector);"
			}
			return "require(\"" + "./" + folder + "/" + f + "\")(injector);";
		}
	}))
		.pipe(gulp.dest('./src/app-backend'))
		.on("end", function () {
			console.log("Injected server backend js files");
			defer.resolve();
		})
	;
	return defer.promise;
}


