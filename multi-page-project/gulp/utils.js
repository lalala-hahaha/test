const fs = require('fs')
const glob = require('glob')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}
// 工具函数：检查是否有匹配的文件
function hasFiles(globPattern) {
  return glob.sync(globPattern).length > 0
}

module.exports = {
  ensureDir,
  hasFiles,
}