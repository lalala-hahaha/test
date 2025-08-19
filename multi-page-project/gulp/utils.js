import fs from 'fs'
import glob from 'glob'
import crypto from 'crypto'

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


