const gulp = require('gulp')
const series = gulp.series
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')

const transformFirebase = () => {
    return tsProject
            .src()
            .pipe(tsProject())
            .pipe(gulp.dest('./'))
}

const watch = () => {
    gulp.watch('../src/services/firebase/**/*.js', transformFirebase)
}

exports.watch = watch
exports.default = series(transformFirebase)