const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const base64 = require('gulp-base64')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const browserSync = require('browser-sync').create()

const { paths, projectRoot } = require('../config')
const { ensureDir,hasFiles } = require('../utils')

// SCSS 编译
gulp.task('styles', (done) => {
  if (!hasFiles(paths.scss)) {
    console.log('🔍 没有 SCSS 文件，跳过 styles 任务')
    return done()
  }
  ensureDir(paths.cssDest)
  return gulp
    .src(paths.scss)
    .pipe(plumber({ errorHandler: notify.onError('SCSS 编译错误: <%= error.message %>') }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(base64({ maxImageSize: 8 * 1024 }))
    .pipe(gulp.dest(paths.cssDest))
    .pipe(browserSync.stream())
})

// JS 编译
gulp.task('scripts', (done) => {
  if (!hasFiles(paths.es6)) {
    console.log('🔍 没有 JS 文件，跳过 scripts 任务')
    return done()
  }
  ensureDir(paths.jsDest)
  return gulp
    .src(paths.es6)
    .pipe(plumber({ errorHandler: notify.onError('JS 编译错误: <%= error.message %>') }))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(browserSync.stream())
})

// 热更新服务
gulp.task('serve', () => {
  browserSync.init({ server: { baseDir: projectRoot }, port: 3000, open: false })

  gulp.watch(paths.scss, gulp.series('styles'))
  gulp.watch(paths.es6, gulp.series('scripts'))
  gulp.watch(paths.html).on('change', browserSync.reload)
})

// 开发任务总入口
gulp.task('dev', gulp.series('styles', 'scripts', 'serve'))
