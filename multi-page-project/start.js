import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';

const page = process.argv[2];
const port = 3000; // 指定端口号

if (!page) {
    console.error('请提供要启动的页面名称，例如：node start.js page1');
    process.exit(1);
}

// 将页面路径设置为项目的 src/pages/page 目录
const pageDir = path.resolve('src/pages', page);
const indexPath = path.join(pageDir, 'index.html');

// 检查目录和文件是否存在
if (!fs.existsSync(indexPath)) {
    console.error(`指定的页面 "${page}" 中没有找到 index.html 文件`);
    process.exit(1);
}

// 使用 live-server 启动指定页面，指定 localhost 和端口号
exec(`npx live-server ${pageDir} --host=localhost --port=${port} --entry-file=index.html`, (error, stdout, stderr) => {
    if (error) {
        console.error(`启动失败: ${error.message}`);
        return;
    }
    if (stderr) console.error(stderr);
    console.log(stdout);
});
