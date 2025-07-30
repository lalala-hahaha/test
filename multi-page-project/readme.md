# 工程使用说明
## 安装
1. 启动终端
2. 进入 `gulpfile.js和package.json` 所在根目录
3. node切换到 `v18.20.8`
4. 执行 `pnpm install`

## 运行
1. 启动终端
2. 进入到项目目录，如: `/pages/admin_walinks/`
### 开发
1. 执行 `gulp dev --cwd.`
2. 打开 `http://localhost:3000` 或 `http://本机IP:3000` 进行访问
3. 如同时开发多个项目，则 `http://localhost:3001` 进行访问，以此类推
### 打包
1. 执行 `gulp build --cwd.`
2. 产物见项目目录下的 `/release/`
