const path = require('path')
const projectRoot = process.cwd()
const outputDir = path.join(projectRoot, 'release')

module.exports = {
  projectRoot,
  outputDir,
  paths: {
    scss: path.join(projectRoot, 'scss/**/*.scss'),
    cssDest: path.join(projectRoot, 'css'),
    es6: path.join(projectRoot, 'es6/**/*.js'),
    jsDest: path.join(projectRoot, 'js'),
    html: path.join(projectRoot, '*.html'),
    imgs: path.join(projectRoot, 'img/**/*.{png,jpg,jpeg,gif,svg}'),
  },
}