const {src, dest, watch, series, parallel} = require("gulp");
const prettier = require("gulp-prettier");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const del = require("del");

const formatter = () => {
    return src("./src/*.{html,css,js}")
        .pipe(prettier({ singleQuote: true }))
        .pipe(dest("./dist"))
        .pipe(browserSync.stream())
}

const html = () => {
    return src("./src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest("./dist/mini-files"))
}

const cssPrefix = () => {
    return src("./src/*.css")
        .pipe(autoprefixer())
        .pipe(dest("./dist"))
}

const css = () => {
    return src("./dist/*.css")
        .pipe(csso())
        .pipe(dest("./dist/mini-files"))
}

const server = () => {
    browserSync.init(
        {
            server: {
                baseDir: "./dist"
            }
        }
    )
}

const clear = () => {
    return del("./dist");
}

const watcher = () => {watch("./src/**/*.{html,css,js}", series(formatter, cssPrefix, css, html))}

exports.dev = series(
    clear,
    formatter,
    cssPrefix,
    css,
    html,
    parallel(watcher, server)
);

