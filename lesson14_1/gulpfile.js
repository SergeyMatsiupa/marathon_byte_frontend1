// const gulp = require('gulp')
const {src, dest, task, series, watch, parallel} = require('gulp')
const rm = require( 'gulp-rm' )
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create()
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

const {SRC_PATH, DIST_PATH, STYLE_LIBS} = require('./gulp.config')

const reload = browserSync.reload;

// const files = [
//     'src/styles/first.scss',
//     'src/styles/second.scss'
// ]
// const files = [
//     'src/styles/*.scss',
//     '!src/styles/second.scss'
// ]

task( 'clean', () => {
    console.log(env);
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm())
  });

// task('copy', series('clean', () => {
//     // return src('src/**/*.scss').pipe(dest('dist'))
//     return src('src/styles/*.scss').pipe(dest('dist'));
//     })
// );

task('copy:html',  () => {
    // return src('src/**/*.scss').pipe(dest('dist'))
    // return src('src/styles/*.scss').pipe(dest('dist'));
    return src(`${SRC_PATH}/*.html`)
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({stream: true}));
});


const styles = [
    'src/styles/main.scss',
];


task('styles', () => {
    // return src("./src/styles/main.scss")
    return src([...STYLE_LIBS,'src/styles/main.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss')) //по сути переименовывает конечный css-файл
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(
        gulpif(env === 'prod',
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false,
            })
        )
    )
    .pipe(gulpif(env === 'prod', cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`));
})

task('icons', () => {
    return src(`${SRC_PATH}/img/**`)
    .pipe(dest(`${DIST_PATH}/img`))
});

task('server', function() {
    browserSync.init({
        server: {
            baseDir: `${DIST_PATH}`,
        },
        open: false
    });
});

// exports.copy = copy

task('watch', () => {
    watch("./src/styles/**/*.scss", series('styles'))
    watch("./src/*.html", series('copy:html'));
    watch("./src/img/**", series('icons'));
});

// task("default", series("clean", "copy"));
task(
    "default", 
    series("clean", 
        parallel("copy:html", "styles", "icons"), 
        parallel("watch", "server")
));


task('build', series('clean', parallel("copy:html", "styles", "icons")));
