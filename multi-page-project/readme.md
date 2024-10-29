multi-page-project
│
├── src                     // 源文件目录
│   ├── pages               // 每个页面文件夹
│   │   ├── page1
│   │   │   ├── index.html
│   │   │   ├── style.css
│   │   │   └── script.js
│   │   ├── page2
│   │   └── page3
│   │       ├── index.html
│   │       ├── style.css
│   │       └── script.js
│   │
│   ├── assets              // 通用资源（如图片、字体等）
│   │   ├── img
│   │   └── fonts
│   │
│   └── styles              // 全局样式
│       └── main.css
│
└── package.json            // 项目配置

如运行不起来，请先安装node 18环境
npm install live-server -g