const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const os = require('os')
const { projectRoot } = require('../config')

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

  const content = `# 页面信息说明

- 创建人：${creator}
- 创建时间：${createdTime}

- 最后修改人：${username}
- 最后修改时间：${modifiedTime}

${accessUrl}
`
  fs.writeFileSync(readmePath, content, 'utf8')
  console.log('📄 README.md 已更新')
  done()
})