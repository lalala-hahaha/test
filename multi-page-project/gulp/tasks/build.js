import gulp from "gulp";
import { deleteAsync } from "del";
import useref from "gulp-useref";
import gulpIf from "gulp-if";
import terser from "gulp-terser";
import cleanCSS from "gulp-clean-css";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import rev from "gulp-rev";
import revReplace from "gulp-rev-replace";
import minimist from "minimist";
import path from "path";
import fs from "fs";
import crypto from "crypto";

import { ensureDir, hasFiles } from "../utils.js";
import { paths, outputDir } from "../config.js";

import { styles, scripts } from "./dev.js";
import { createReadme } from "./genReadme.js";

const argv = minimist(process.argv.slice(2));
const _a = !!argv.a;

const cacheFile = ".image-cache.json";

// 工具 - 读取缓存
function loadCache() {
  if (fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile, "utf8"));
  }
  return {};
}

// 工具 - 保存缓存
function saveCache(cache) {
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
}

// 工具 - 计算文件哈希
function fileHash(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(buffer).digest("hex");
}

// 清理目录
export async function clean() {
  await deleteAsync([outputDir]);
}

// 图片压缩并 hash（增强版）
export const imagesRev = () => {
  if (!hasFiles(paths.imgs)) {
    console.log("🔍 没有 img 文件，跳过 图片处理 任务");
    return Promise.resolve();
  }

  ensureDir(outputDir);
  const destDir = path.join(outputDir, "img");
  const oldCache = loadCache();
  const newCache = {};

  return gulp
    .src(paths.imgs, { encoding: false })
    .pipe(
      gulpIf((file) => {
        const hash = fileHash(file.path);
        newCache[file.relative] = hash;
        return oldCache[file.relative] !== hash; // 只处理变化文件
      }, imagemin())
    )
    .pipe(rev())
    .pipe(gulp.dest(destDir))
    .pipe(rev.manifest("rev-img.json", { merge: true }))
    .pipe(gulp.dest(outputDir))
    .on("end", () => {
      saveCache(newCache);
    });
};

// 图片压缩（增强版）
export const images = () => {
  if (!hasFiles(paths.imgs)) {
    console.log("🔍 没有 img 文件，跳过 图片处理 任务");
    return Promise.resolve();
  }

  ensureDir(outputDir);
  const destDir = path.join(outputDir, "img");
  const oldCache = loadCache();
  const newCache = {};

  return gulp
    .src(paths.imgs, { encoding: false })
    .pipe(
      gulpIf((file) => {
        const hash = fileHash(file.path);
        newCache[file.relative] = hash;
        return oldCache[file.relative] !== hash;
      }, imagemin())
    )
    .pipe(gulp.dest(destDir))
    .on("end", () => {
      saveCache(newCache);
    });
};

// 合并压缩资源并 hash
export const assetsRev = () => {
  ensureDir(outputDir);
  return gulp
    .src(paths.html)
    .pipe(useref())
    .pipe(
      gulpIf(
        "*.js",
        terser({
          compress: {
            drop_console: true, // 去掉所有 console.*
            drop_debugger: true, // 去掉 debugger 语句
          },
          format: {
            comments: false, // 去掉注释
          },
          mangle: true, // 混淆变量名，建议开启
          ecma: 5, // 指定 ECMAScript 版本
          keep_classnames: false, // 混淆时不保留类名
          keep_fnames: false, // 混淆时不保留函数名
        })
      )
    )
    .pipe(gulpIf("*.css", cleanCSS()))
    .pipe(gulpIf(/\.(js|css)$/, rev()))
    .pipe(revReplace())
    .pipe(gulpIf(/\.(js|css)$/, gulp.dest(outputDir)))
    .pipe(
      gulpIf(
        "*.html",
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true,
        })
      )
    )
    .pipe(gulp.dest(outputDir));
};

// 合并压缩资源
export const assets = () => {
  ensureDir(outputDir);
  return gulp
    .src(paths.html)
    .pipe(useref())
    .pipe(
      gulpIf(
        "*.js",
        terser({
          compress: {
            drop_console: true, // 去掉所有 console.*
            drop_debugger: true, // 去掉 debugger 语句
          },
          format: {
            comments: false, // 去掉注释
          },
          mangle: true, // 混淆变量名，建议开启
          ecma: 5, // 指定 ECMAScript 版本
          keep_classnames: false, // 混淆时不保留类名
          keep_fnames: false, // 混淆时不保留函数名
        })
      )
    )
    .pipe(gulpIf("*.css", cleanCSS()))
    .pipe(gulpIf(/\.(js|css)$/, gulp.dest(outputDir)))
    .pipe(
      gulpIf(
        "*.html",
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true,
        })
      )
    )
    .pipe(gulp.dest(outputDir));
};

// 替换 hash 图片路径
export const revReplaceImages = () => {
  if (!hasFiles(paths.imgs)) {
    console.log("🔍 没有 img 文件，跳过 图片处理 任务");
    return Promise.resolve();
  }
  const manifest = gulp.src(path.join(outputDir, "rev-img.json"));
  return gulp
    .src(path.join(outputDir, "**/*.{html,css,js}"))
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest(outputDir));
};

// 删除临时的图片映射关系文件
export const cleanRevManifest = async () =>
  await deleteAsync(path.join(outputDir, "rev-img.json"));

// 构建任务
export const build = _a
  ? gulp.series(styles, scripts, clean, images, assets, createReadme)
  : gulp.series(
      styles,
      scripts,
      clean,
      imagesRev,
      assetsRev,
      revReplaceImages,
      cleanRevManifest,
      createReadme
    );

// 预发布任务
export const pre = gulp.series(build);
