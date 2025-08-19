import fs from 'fs'
import fse from 'fs-extra'
import gulp from 'gulp'
import { deleteAsync } from 'del'
import useref from 'gulp-useref'
import gulpIf from 'gulp-if'
import terser from 'gulp-terser'
import cleanCSS from 'gulp-clean-css'
import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'
import rev from 'gulp-rev'
import revReplace from 'gulp-rev-replace'
import minimist from 'minimist'
import path from 'path'
import Vinyl from 'vinyl'
import { Readable } from 'stream'

import { ensureDir, hasFiles, loadCache, saveCache, fileHash } from '../utils.js'
import { paths, outputDir, projectRoot } from '../config.js'

import { styles, scripts } from './dev.js'
import { createReadme } from './genReadme.js'

const argv = minimist(process.argv.slice(2))

// 判断命令行是否带 -a，带 -a 则资源不hash
const isHasA = !!argv.a
const useHash = !isHasA

const tmpImagesDir = path.join(projectRoot, '.tmp_images')
const destDir = path.join(outputDir, 'img')

// 备份旧图片到临时目录
export async function backupOldImages() {
  if (fs.existsSync(destDir)) {
    ensureDir(tmpImagesDir)
    try {
      fse.copySync(destDir, tmpImagesDir)
    } catch (err) {
      console.error(err)
    }
    console.log('📦 备份上次构建的图片到 .tmp_images')
  }
}

// 删除临时目录
export async function removeTmpImages() {
  if (fs.existsSync(tmpImagesDir)) {
    await fse.remove(tmpImagesDir)
    console.log('🗑️  清理临时图片目录')
  }
}

// 清理目录
export async function clean() {
  await deleteAsync([outputDir])
}

// 处理图片
export const processImages = () => {
  if (!hasFiles(paths.imgs)) {
    console.log('🔍 没有 img 文件，跳过「图片处理」任务')
    return Promise.resolve()
  }

  ensureDir(destDir)
  const oldCache = loadCache()
  const newCache = {}
  console.log('🏞️  开始「处理图片任务」')

  return gulp
    .src(paths.imgs, {
      encoding: false,
      base: paths.imgsBase || paths.imgs.replace(/(\*\*\/\*.*)$/, ''),
    })
    .pipe(
      gulpIf(file => {
        // 文件名
        const rel = file.relative.replace(/\\/g, '/')
        // 当前文件hash
        const currentHash = fileHash(file.path)
        // 上次打包产物信息
        const oldFileInfo = oldCache[rel]
        // 此次打包是否需要rev
        file._needsRev = useHash

        // 输出文件名：
        const outName = useHash ? oldFileInfo?.rev : rel

        // 按 oldFileInfo.rev 查备份到临时目录的图片是否存在
        const candidate = (oldFileInfo?.rev && path.join(tmpImagesDir, oldFileInfo?.rev)) || null

        // 新文件或内容变更 → 压缩
        if (!oldFileInfo || oldFileInfo.hash !== currentHash) {
          console.log('// 新文件或变更文件 → 压缩')
          newCache[rel] = { hash: currentHash, rev: outName }
          return true
        }
        if (candidate && fs.existsSync(candidate)) {
          // 命中旧产物，直接复用其内容
          file.contents = fs.readFileSync(candidate)
          if (useHash && rel === oldFileInfo.rev) {
            // -a ==> hash，需要rev
            file._needsRev = true
          } else if (!useHash) {
            // hash ==> -a，无需rev
            file._needsRev = false
            file.path = path.join(file.base, rel)
          } else {
            // 打包方式没变，文件没变，保留旧的文件名
            file._needsRev = false
            file.path = path.join(file.base, oldFileInfo.rev)
          }
          newCache[rel] = { hash: currentHash, rev: outName }
          return false
        }
        // 没找到旧产物 → 压缩并重新生成 rev
        newCache[rel] = { hash: currentHash, rev: outName }
        return true
      }, imagemin()),
    )
    .pipe(gulpIf(file => file._needsRev, rev()))
    .pipe(gulp.dest(destDir))
    .pipe(
      rev.manifest().on('data', file => {
        const manifest = JSON.parse(file.contents.toString())
        for (const [orig, revName] of Object.entries(manifest)) {
          const rel = orig.replace(/\\/g, '/')
          const hash = newCache[rel]?.hash || oldCache[rel]?.hash || ''
          const revCur = revName || oldCache[rel]?.rev || ''
          newCache[rel] = { hash, rev: revCur }
        }
        return true
      }),
    )
    .on('end', () => {
      saveCache(newCache)
      console.log('✅ 图片处理完成，缓存已更新')
    })
}

// 处理静态资源
const processAssets = () => {
  ensureDir(outputDir)
  return gulp
    .src(paths.html)
    .pipe(useref())
    .pipe(
      gulpIf(
        '*.js',
        terser({
          compress: {
            unused: true, // 删除未使用的变量/函数（默认 true）
            dead_code: true, // 删除不可达代码（默认 true）
            drop_debugger: true, // 删除 debugger 语句
            drop_console: true, // 删除 console.log 等
            toplevel: true, // 允许删除顶层未用到的函数/变量（很关键）
            passes: 2, // 多次压缩以进一步优化（可选）
          },
          format: {
            comments: false, // 去掉注释
          },
          mangle: {
            toplevel: true, // 混淆顶层变量/函数名（可选）
          },
          ecma: 5, // 指定 ECMAScript 版本
          keep_classnames: false, // 混淆时不保留类名
          keep_fnames: false, // 混淆时不保留函数名
        }),
      ),
    )
    .pipe(gulpIf('*.css', cleanCSS()))
    .pipe(gulpIf(useHash, gulpIf(/\.(js|css)$/, rev())))
    .pipe(gulpIf(useHash, revReplace()))
    .pipe(gulpIf(/\.(js|css)$/, gulp.dest(outputDir)))
    .pipe(
      gulpIf(
        '*.html',
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true,
        }),
      ),
    )
    .pipe(gulp.dest(outputDir))
}

// 替换 hash 图片路径
export const revReplaceImages = () => {
  if (!useHash) {
    console.log('🚀 --a不hash，跳过「替换hash图片路径」任务')
    return Promise.resolve()
  }
  if (!hasFiles(paths.imgs)) {
    console.log('🔍 没有 img 文件，跳过「图片替换」任务')
    return Promise.resolve()
  }

  const cache = loadCache()
  const manifestObj = {}

  for (const [rel, { rev }] of Object.entries(cache)) {
    if (rev && rev !== rel) {
      manifestObj[rel] = rev
    }
  }

  // 用内存流创建虚拟 manifest 文件
  const manifestStream = new Readable({ objectMode: true })
  manifestStream.push(
    new Vinyl({
      path: 'manifest.json',
      contents: Buffer.from(JSON.stringify(manifestObj, null, 2)),
    }),
  )
  manifestStream.push(null) // 结束流

  return gulp
    .src(path.join(outputDir, '**/*.{html,css,js}'))
    .pipe(revReplace({ manifest: manifestStream }))
    .pipe(gulp.dest(outputDir))
    .on('end', () => {
      console.log('✅ 已完成 hash 图片路径替换')
    })
}

// 构建任务
export const build = gulp.series(
  backupOldImages,
  styles,
  scripts,
  clean,
  processImages,
  processAssets,
  revReplaceImages,
  createReadme,
  removeTmpImages,
)

// 预发布任务
export const pre = gulp.series(build)
