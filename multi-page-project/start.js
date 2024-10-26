import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';

const page = process.argv[2];

if (!page) {
    console.error('请提供要启动的页面名称，例如：node start.js page1');
    process.exit(1);
}

const pageDir = path.resolve('src/pages', page);
if (!fs.existsSync(pageDir)) {
    console.error(`指定的页面 "${page}" 不存在`);
    process.exit(1);
}

// 使用 live-server 或其他静态服务器工具启动指定页面
exec(`live-server ${pageDir}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`启动失败: ${error.message}`);
        return;
    }
    if (stderr) console.error(stderr);
    console.log(stdout);
});
