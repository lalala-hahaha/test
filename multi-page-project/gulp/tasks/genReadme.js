const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const os = require('os')
const { projectRoot,paths } = require('../config')
const {hasFiles } = require('../utils')

// 向上查找直到 /pages 目录为止
function findHtmlRootDir() {
  let dir = projectRoot
  while (dir !== path.parse(dir).root) {
    if (path.basename(dir) === 'pages') return dir
    dir = path.dirname(dir)
  }
  return null
}

// 拼接线上访问地址
function getAccessUrl() {
  const htmlRoot = findHtmlRootDir()
  if (!htmlRoot) {
    throw new Error('未找到 html 根目录，请确认目录结构包含 /pages/')
  }

  const relativePath = path.relative(htmlRoot, projectRoot)
  return ``
}

// 时间
const transformTime = (timestamp, timeType, separator) => {
  const timestampNum = Number(timestamp)
  if (timestampNum) {
    let cutIndex = 19
    if (timeType && timeType === 'date') {
      cutIndex = 10
    }
    const transformDate = new Date(timestampNum + 8 * 3600 * 1000) // 增加8小时
    if (separator) {
      return transformDate.toJSON().substring(0, cutIndex)
        .replace('T', ' ')
        .replace(/-/g, separator)
    }
    return transformDate.toJSON().substring(0, cutIndex)
      .replace('T', ' ')
  } else {
    return ''
  }
}
// 读取 index.js 中的 pageId
function getPageId() {
  if (!hasFiles(paths.es6)) {
    console.log('🔍 没有 JS 文件，跳过任务')
    return ''
  }

  const indexPath = path.join(projectRoot, 'es6/index.js')  // ✅ 指向具体文件
  if (!fs.existsSync(indexPath)) {
    console.log('❌ index.js 不存在')
    return ''
  }
  const content = fs.readFileSync(indexPath, 'utf8')  // ✅ 读取 index.js 内容

  const match = content.match(/pageId\s*=\s*['"]([^'"]+)['"]/)
  return match ? match[1] : ''
}


// 提取旧的 README 中的创建人和时间
function extractOldInfo(filePath) {
  if (!fs.existsSync(filePath)) return {}

  const content = fs.readFileSync(filePath, 'utf8')
  const creatorMatch = content.match(/创建人：(.+)/)
  const createdTimeMatch = content.match(/创建时间：(.+)/)

  return {
    creator: creatorMatch ? creatorMatch[1].trim() : undefined,
    createdTime: createdTimeMatch ? createdTimeMatch[1].trim() : undefined,
  }
}


gulp.task('createReadme', done => {
  const GTMtime = transformTime(new Date())
  const username = os.userInfo().username || 'unknown'
  const accessUrl = getAccessUrl()
  const readmePath = path.join(projectRoot, 'README.md')

  const old = extractOldInfo(readmePath)

  const creator = old.creator || username
  const createdTime = old.createdTime || GTMtime
  const modifiedTime = GTMtime

  const pageId = getPageId()
  
  const content = `# 页面信息说明

- 创建时间：${createdTime}

- 最后修改时间：${modifiedTime}

- 链接：https://${pageId}.netlify.app/

${pageId ? `- 页面ID：${pageId}` : ''}
`
  fs.writeFileSync(readmePath, content, 'utf8')
  console.log('📄 README.md 已更新')
  done()
})