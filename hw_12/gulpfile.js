const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;
const {SRC_PATH, DIST_PATH, STYLE_LIBS} = require('./gulp.config')
const reload = browserSync.reload;

task('clean', () => {
    console.log(env);
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm())
  });

task('copy:html',  () => {
    return src(`${SRC_PATH}/*.html`)
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({stream: true}));
});


const styles = [
    'src/styles/main.scss',
];
task('styles', () => {
    return src([...STYLE_LIBS, 'src/styles/main.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
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
    .pipe(dest(`${DIST_PATH}/css/`))
    .pipe(reload({stream: true}));
})

task('img', () => {
    return src(`${SRC_PATH}/img/**`)
    .pipe(dest(`${DIST_PATH}/img`))
});

task('files', () => {
    return src(`${SRC_PATH}/files/**`)
    .pipe(dest(`${DIST_PATH}/files`))
});

task('script', () => {
    return src(`${SRC_PATH}/script/**`)
    .pipe(dest(`${DIST_PATH}/script`))
    .pipe(reload({stream: true}));
});

task('fonts', () => {
    return src(`${SRC_PATH}/fonts/**`)
    .pipe(dest(`${DIST_PATH}/fonts`))
});


task('server', function() {
    browserSync.init({
        server: {
            baseDir: `${DIST_PATH}`,
        },
        open: false
    });
});

task('watch', () => {
    watch("./src/styles/**/*.scss", series('styles'));
    watch("./src/*.html", series('copy:html'));
    watch("./src/img/**", series('img'));
    watch("./src/files/**", series('files'));
    watch("./src/script/**", series('script'));
    watch("./src/fonts/**", series('fonts'));
});

task(
    "default", 
    series("clean", 
        parallel("copy:html", "styles", "img", "files", "fonts", "script"), 
        parallel("watch", "server")
));

task('build', series('clean', parallel("copy:html", "styles", "img", "files", "fonts", "script")));
