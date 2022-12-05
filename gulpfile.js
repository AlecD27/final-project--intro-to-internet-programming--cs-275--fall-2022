const { src, dest, series, watch } = require(`gulp`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssCompressor = require(`gulp-clean-css`),
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    CSSLinter = require(`gulp-stylelint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

let lintJS = () => {
    return src([`js/main.js`])
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let lintCSS = () => {
    return src([`css/style.css`])
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let transpileJSForDev = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let compressHTML = () => {
    return src([`index.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compressCSS = () => {
    return src('styles/main.css')
      .pipe(cssCompressor({compatibility: 'ie8'}))
      .pipe(dest('prod/css'));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `prod`,
                `.`
            ]
        }
    });
}

    watch(`main.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`main.css`, series(lintCSS, compressCSS))
        .on(`change`, reload);

exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.serve = series(
    lintJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd
);