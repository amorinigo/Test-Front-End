// GULP
const { src, dest, task, watch, series } = require('gulp');

// HTML
const htmlmin 	   = require( 'gulp-htmlmin' );
const cacheBust    = require( 'gulp-cache-bust' );

// SASS
const sass         = require( 'gulp-sass' );
const postcss 	   = require('gulp-postcss' );
const cssnano      = require('cssnano' );
const autoprefixer = require( 'autoprefixer' );
const clean        = require('gulp-purgecss' );

// JS with ES6
const uglify       = require( 'gulp-uglify' );
const babelify     = require( 'babelify' );
const browserify   = require( 'browserify' );
const source       = require( 'vinyl-source-stream' );
const buffer       = require( 'vinyl-buffer' );
const stripDebug   = require( 'gulp-strip-debug' );

// PLUGINS
const rename       = require( 'gulp-rename' );
const sourcemaps   = require( 'gulp-sourcemaps' );
const plumber      = require( 'gulp-plumber' );
const options      = require( 'gulp-options' );
const gulpif       = require( 'gulp-if' );
const browserSync  = require( 'browser-sync' ).create();

// CONSTANTS
const cssPlugins = [cssnano(), autoprefixer()];
const jsFiles    = [ 'index.js' ];

// TASKS
task( 'html', () => {

	return src( './src/*.html' )
		.pipe( plumber() )
		.pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true
            })
        )
        .pipe( cacheBust({
            type: 'timestamp'
        }) )
		.pipe( dest( './dist/' ) );

} );

task( 'sass', done => {
	src( [ './src/scss/index.scss' ] )
	.pipe( sourcemaps.init() )
	.pipe( sass({
		errLogToConsole: true,
		outputStyle: 'compressed'
	}) )
	.pipe( postcss(cssPlugins) )
	.on( 'error', console.error.bind( console ) )
	.pipe( rename( { suffix: '.min' } ) )
	.pipe( sourcemaps.write( './' ) )
	.pipe( dest( './dist/css/' ) )
	.pipe( browserSync.stream() );
	done();
} );

task( 'js', done => {
	jsFiles.map( entry => {
		return browserify({ entries: ['./src/js/' + entry] })
		.transform( babelify, { presets: [ '@babel/preset-env' ] } )
		.bundle()
		.pipe( source( entry ) )
		.pipe( rename({ extname: '.min.js' }) )
		.pipe( buffer() )
		.pipe( gulpif( options.has( 'production' ), stripDebug() ) )
		.pipe( sourcemaps.init({ loadMaps: true }) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( dest( './dist/js/' ) )
		.pipe( browserSync.stream() );
	});
	done();
} );

// Run 'gulp clean' when changes are to be pushed to production.
task( 'clean', () => {
    return src( './dist/css/styles.min.css' )
		.pipe( plumber() )
		.pipe( clean({ content: ['./dist/*.html'] }) )
		.pipe( dest('./dist/css') );
} );

task( 'images', () => {

	return src( './src/assets/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}' )
		.pipe( plumber() )
		.pipe( dest( './dist/assets/images/' ) );

} );

const reload = done => {
	browserSync.reload();
	done();
}

task( 'default', () => {

	browserSync.init({ server: { baseDir: './dist/' } });
	watch( './src/*.html',          series('html',   reload) );
	watch( './src/scss/**/*.scss',  series('sass',   reload) );
	watch( './src/js/**/*.js',      series('js',     reload) );
	watch( './src/assets/images/*', series('images', reload) );
	src( './dist/js/index.min.js' );

} );
