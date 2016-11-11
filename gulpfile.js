'use strict';

const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const gulpSequence = require('gulp-sequence');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');

const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');


const doLess = () => {
    return gulp.src('src/*.less')
        .pipe(less())
        // .pipe(cleanCSS())
        .pipe(concat('calc.css'))
        .pipe(gulp.dest('build'))
};

gulp.task('less', () => {
    return doLess();
});

const externalLib = [
    // 'react',
    // 'react-dom'
];

const browserifyConfig = {
    entries: ['src/calc.jsx'],
    transform: [babelify],
    // plugin: ['browserify-shim'],
    debug: true
};

const doWatchify = () => {

    let opts = Object.assign({}, watchify.args, browserifyConfig);

    let b = watchify(browserify(opts));

    b.on('update', doBundle.bind(global, b));
    b.on('log', console.log.bind(console));

    return b;
};

const doBundle = (b) => {
    if (!b) {
        b = browserify(browserifyConfig);
    }

    return b.external(externalLib)
        .bundle()
        .on('error', (err) => {
            console.log(err);
            console.log(err.codeFrame);
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'));
};

gulp.task('watch', () => {
    let jsWatcher = gulp.watch(['src/**/*.js']);
    let styleWatcher = gulp.watch(['src/**/*.less']);

    jsWatcher.on('change', (e) => {
        if (e.type === 'changed' || e.type === 'added') {
            // lint
        }
    });

    styleWatcher.on('change', (e) => {
        if (e.type === 'changed' || e.type === 'added') {
            doLess();
            console.log('build less done.', new Date);
        }
    });

    return doBundle(doWatchify());
});
