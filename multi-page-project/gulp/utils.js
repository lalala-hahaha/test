import gulp from 'gulp'
import fs from 'fs'
import glob from 'glob'
import crypto from 'crypto'
import { pastel, morning } from 'gradient-string'

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// 工具函数：检查是否有匹配的文件
export function hasFiles(globPattern) {
  return glob.sync(globPattern).length > 0
}

const cacheFile = '.image-cache.json'

// 读取缓存
export function loadCache() {
  if (fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
  }
  return {}
}

// 保存缓存
export function saveCache(cache) {
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2))
}

// 计算文件哈希
export function fileHash(filePath) {
  const buffer = fs.readFileSync(filePath)
  return crypto.createHash('md5').update(buffer).digest('hex')
}

// logger
export const logger = {
  title: msg => console.log(pastel(`✨🚀✨ ■■■■■■■■■■■■■■■■■■■■■■■■■ ${msg} ■■■■■■■■■■■■■■■■■■■■■■■■■ ✨🌟✨`)),
  content: msg => console.log(morning(` ${msg}`)),
}

// 全局 hook：自动在 build 任务 start/end 打印
gulp.on('start', (evt) => {
  if (evt.name === 'dev') {
    logger.title('启动 dev 模式')
  }
  if (evt.name === 'build') {
    logger.title('build start')
  }
  if (evt.name === 'pre') {
    logger.title('pre start')
  }
  if (evt.name === 'processImages') {
    logger.content('🖼️  处理图片 start')
  }
})

gulp.on('stop', (evt) => {
  if (evt.name === 'build') {
    logger.title('build end')
  }
  if (evt.name === 'pre') {
    logger.title('pre end')
  }
  if (evt.name === 'processImages') {
    logger.content('🖼️  处理图片 end')
  }
})