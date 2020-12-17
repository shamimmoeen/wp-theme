const { src, dest, watch, series } = require( 'gulp' );
const sass = require( 'gulp-sass' );
const sourcemaps = require( 'gulp-sourcemaps' );
const touch = require( 'gulp-touch-cmd' );
const autoPrefix = require( 'gulp-autoprefixer' );
const babel = require( 'gulp-babel' );
const concat = require( 'gulp-concat' );
const uglify = require( 'gulp-uglify' );
const browserSync = require( 'browser-sync' ).create();

function css() {
	return src( './assets/sass/wp-theme-styles.scss' )
		.pipe( sourcemaps.init() )
		.pipe( sass.sync( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
		.pipe( autoPrefix() )
		.pipe( sourcemaps.write() )
		.pipe( dest( './assets/build' ) )
		.pipe( browserSync.stream() )
		.pipe( touch() );
}

function js() {
	return src( './assets/js/**/*.js' )
		.pipe( sourcemaps.init() )
		.pipe( babel( {
			presets: [ '@babel/env' ],
		} ) )
		.pipe( concat( 'wp-theme-scripts.js' ) )
		.pipe( uglify() )
		.pipe( sourcemaps.write() )
		.pipe( dest( './assets/build' ) )
		.pipe( touch() );
}

function browser() {
	browserSync.init( {
		open: false, // Stop the browser from automatically opening
		proxy: 'http://advancedwptable.test/',
		files: [
			'./**/*.php',
		],
	} );

	watch( './assets/sass/**/*.scss', css );
	watch( './assets/js/**/*.js', js ).on( 'change', browserSync.reload );
}

const build = series(
	css,
	js
);

module.exports.css = css;
module.exports.js = js;
module.exports.build = build;
module.exports.default = browser;
