'use strict';

var env = process.env.NODE_ENV || 'development';
var path = require('path');

var gulp        = require('gulp'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    jsStylish   = require('jshint-stylish'),
    karma       = require('karma').server;

var $ = require('gulp-load-plugins')();

gulp.task('tdd', ['jshint'], tdd);
gulp.task('test', ['jshint'], test);
gulp.task('jshint', jshint);

/* Test tasks */
function tdd (done) {
    karma.start({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: false,
        autoWatch: true
    }, done);
}

function test (done) {
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
    //console.error('BURP');
    process.stdout.write('\x07');
    this.emit('end');
}

gulp.watch('lib/**/*.js', ['jshint']);
