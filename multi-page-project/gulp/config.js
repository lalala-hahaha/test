import path from 'path'
import minimist from 'minimist'

const projectRoot = process.cwd()

let outputDir = path.join(projectRoot, 'release')

const argv = minimist(process.argv.slice(2))
const isPre = argv._[0] === 'pre'

if (isPre) {
  outputDir = path.join(projectRoot, 'pre')
}

export { projectRoot, outputDir }

export const paths = {
  scss: path.join(projectRoot, 'scss/**/*.scss'),
  cssDest: path.join(projectRoot, 'css'),
  es6: path.join(projectRoot, 'es6/**/*.js'),
  jsDest: path.join(projectRoot, 'js'),
  html: path.join(projectRoot, '*.html'),
  imgs: path.join(projectRoot, 'img/**/*.{png,jpg,jpeg,gif,svg}'),
}
