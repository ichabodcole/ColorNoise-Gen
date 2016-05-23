'use strict';

var env = process.env.NODE_ENV || 'development';
var path = require('path');

var gulp        = require('gulp'),
    del         = require('del'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    jsStylish   = require('jshint-stylish'),
    karma       = require('karma').server;

var $ = require('gulp-load-plugins')();

var config = {
    dist: './dist',
    fileOutput: 'colornoise-gen.js'
};

gulp.task('build', ['clean', 'jshint', 'test'], build);
gulp.task('tdd', ['jshint'], tdd);
gulp.task('test', ['jshint'], test);
gulp.task('jshint', jshint);
gulp.task('clean', clean);

/* Build / Bundle tasks */
function build() {
    var b = browserify({
        entries: './index.js',
        debug: false
    });

    b.add('babelify/polyfill');

    return b.bundle()
        .pipe(source(config.fileOutput))
        .pipe(gulp.dest(config.dist))
        .pipe(buffer())
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.uglify())
        .pipe($.rename({ extname: '.min.js' }))
        .on('error', $.util.log)
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist));
}

function clean(done) {
    return del([config.dist]);
}

/* Test tasks */
function tdd(done) {
    karma.start({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: false,
        autoWatch: true
    }, done);
    startWatch();
}

function test(done) {
    karma.start({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: true,
    });
    done();
}

/* JavaScript Tasks */
function jshint() {
    var src = 'lib/**/*.js';
    return gulp.src([src])
        .pipe($.jshint())
        .on('error', handleError)
        .pipe($.jshint.reporter(jsStylish));
}

function handleError(err) {
    console.error(err.toString());
    process.stdout.write('\x07');
    this.emit('end');
}

function startWatch() {
    gulp.watch('lib/**/*.js', ['jshint']);
}
