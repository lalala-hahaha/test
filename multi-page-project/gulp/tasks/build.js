const gulp = require('gulp')
const del = require('del')
const useref = require('gulp-useref')
const gulpIf = require('gulp-if')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const rev = require('gulp-rev')
const revReplace = require('gulp-rev-replace')
const argv = require('minimist')(process.argv.slice(2))
const _a = argv.a ? true : false;
const { ensureDir } = require('../utils')
const { paths, outputDir } = require('../config')
const path = require('path')

// 清理目录
gulp.task('clean', () => del([outputDir]))

// 图片压缩并 hash
gulp.task('images-rev', () => {
  ensureDir(outputDir)
  return gulp
    .src(paths.imgs, { encoding: false })
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest(path.join(outputDir, 'img')))
    .pipe(rev.manifest('rev-img.json'))
    .pipe(gulp.dest(outputDir))
})
// 图片压缩
gulp.task('images', () => {
  ensureDir(outputDir)
  return gulp
    .src(paths.imgs, { encoding: false })
    .pipe(imagemin())
    .pipe(gulp.dest(path.join(outputDir, 'img')))
})

// 合并压缩资源并hash
gulp.task('assets-rev', () => {
  ensureDir(outputDir)
  return gulp
    .src(paths.html)
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cleanCSS()))
    .pipe(gulpIf(/\.(js|css)$/, rev()))
    .pipe(revReplace())
    .pipe(gulpIf(/\.(js|css)$/, gulp.dest(outputDir)))
    .pipe(gulpIf('*.html', htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(outputDir))
})
// 合并压缩资源
gulp.task('assets', () => {
  ensureDir(outputDir)
  return gulp
    .src(paths.html)
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cleanCSS()))
    .pipe(gulpIf(/\.(js|css)$/, gulp.dest(outputDir)))
    .pipe(gulpIf('*.html', htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(outputDir))
})

// 替换 hash 图片路径
gulp.task('revReplaceImages', () => {
  const manifest = gulp.src(path.join(outputDir, 'rev-img.json'))
  return gulp.src(path.join(outputDir, '**/*.{html,css,js}')).pipe(revReplace({ manifest })).pipe(gulp.dest(outputDir))
})
// 删除临时的图片映射关系文件
gulp.task('cleanRevManifest', () => del(path.join(outputDir, 'rev-img.json')))

// 构建总任务
gulp.task('build', done => {
  if (_a) {
    return gulp.series(
      'styles',
      'scripts',
      'clean',
      'images',
      'assets',
      'createReadme',
    )(done);
  } else {
    return gulp.series(
      'styles',
      'scripts',
      'clean',
      'images-rev',
      'assets-rev',
      'revReplaceImages',
      'cleanRevManifest',
      'createReadme',
    )(done);
  }
})
