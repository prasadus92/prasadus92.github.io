const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');

// Clean the dist directory
function clean() {
    return del(['dist/**/*']);
}

// Process CSS files
function styles() {
    return gulp.src([
        'assets/css/main.css',
        'assets/css/themes.dark.css',
        'assets/css/custom.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
}

// Process JavaScript files
function scripts() {
    return gulp.src('assets/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream());
}

// Copy other assets
function copyAssets() {
    return gulp.src([
        'assets/images/**/*',
        'assets/plugins/**/*',
        'assets/js/jquery.min.js',
        'assets/js/dense.js',
        'assets/js/scrollreveal.min.js'
    ], { base: 'assets' })
        .pipe(gulp.dest('dist/assets'));
}

// Copy HTML files
function copyHtml() {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

// Watch for changes
function watch() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('assets/css/**/*.css', styles);
    gulp.watch('assets/js/**/*.js', scripts);
    gulp.watch('*.html', copyHtml);
}

// Build task
const build = gulp.series(clean, gulp.parallel(styles, scripts, copyAssets, copyHtml));

// Export tasks
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.copyAssets = copyAssets;
exports.copyHtml = copyHtml;
exports.watch = watch;
exports.build = build;
exports.default = build; 