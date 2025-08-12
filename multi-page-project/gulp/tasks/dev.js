import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import base64 from "gulp-base64";
import babel from "gulp-babel";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSyncLib from "browser-sync";

import { paths, projectRoot } from "../config.js";
import { ensureDir, hasFiles } from "../utils.js";

const sass = gulpSass(dartSass);
const browserSync = browserSyncLib.create();

// SCSS 编译
export const styles = () => {
  if (!hasFiles(paths.scss)) {
    console.log("🔍 没有 SCSS 文件，跳过 styles 任务");
    return Promise.resolve();
  }
  ensureDir(paths.cssDest);
  return gulp
    .src(paths.scss)
    .pipe(
      plumber({
        errorHandler: notify.onError("SCSS 编译错误: <%= error.message %>"),
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(base64({ maxImageSize: 8 * 1024 }))
    .pipe(gulp.dest(paths.cssDest))
    .pipe(browserSync.stream());
};

// JS 编译
export const scripts = () => {
  if (!hasFiles(paths.es6)) {
    console.log("🔍 没有 JS 文件，跳过 scripts 任务");
    return Promise.resolve();
  }
  ensureDir(paths.jsDest);
  return gulp
    .src(paths.es6)
    .pipe(
      plumber({
        errorHandler: notify.onError("JS 编译错误: <%= error.message %>"),
      })
    )
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(browserSync.stream());
};

// 热更新服务
export const serve = async () => {
  browserSync.init({
    server: { baseDir: projectRoot },
    port: 3000,
    open: false,
  });
  gulp.watch(paths.scss, styles);
  gulp.watch(paths.es6, scripts);
  gulp.watch(paths.html).on("change", browserSync.reload);
};

// 开发任务总入口
export const dev = gulp.series(styles, scripts, serve);
