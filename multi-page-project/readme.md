# 工程使用说明

## 目录结构
```
📁 pages根目录
├── 📁项目文件夹
│ ├── 📁scss
│ │ ├── 📄xxx1.scss
│ │ └── 📄xxx2.scss
│ ├── 📁es6
│ │ ├── 📄xxx1.js
│ │ └── 📄xxx2.js
│ ├── 📁img
│ │ ├── 📁img子目录
│ │ │ └── 📄xxx1.png 
│ │ │ └── 📄xxx2.jpg 
│ │ └── 📄xxx.jpg
│ └── 📄index.html
└── 📁gulp
└── 📄package.json
└── 📄gulpfile.js
└── 📄README.md
```


## 安装
1. 启动终端
2. 进入 `/html/` 根目录
3. node切换到 `v20.19.4`
4. 执行 `pnpm install`

## 运行
1. 启动终端
2. 进入到项目目录，如: `/pages/admin_walinks/`

### 开发
1. 执行 `gulp dev --cwd.`
2. 打开 `http://localhost:3000` 或 `http://本机IP:3000` 进行访问
3. 如同时开发多个项目，则 `http://localhost:3001` 进行访问，以此类推

### 打包
#### 打测试包
1. 打包压缩并hash
- 执行 `gulp pre --cwd.`
2. 只打包压缩保持原指定命名
- 执行 `gulp pre -a --cwd.`
3. 产物见项目目录下的 `/pre/`

#### 打线上包
1. 打包压缩并hash
- 执行 `gulp build --cwd.`
2. 只打包压缩保持原指定命名
- 执行 `gulp build -a --cwd.`
3. 产物见项目目录下的 `/release/`
