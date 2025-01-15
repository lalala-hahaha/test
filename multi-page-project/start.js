import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';
import os from 'os';

// 获取本机 IP 地址
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName] || []) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

const page = process.argv[2];
const port = 3000; // 指定端口号
const host = '0.0.0.0'; // 绑定所有网络接口
const localIP = getLocalIP(); // 获取本机 IP 地址

if (!page) {
    console.error('请提供要启动的页面名称，例如：node start.js page1');
    process.exit(1);
}

// 设置页面路径为项目的 src/pages/page 目录
const pageDir = path.resolve('src/pages', page);
const indexPath = path.join(pageDir, 'index.html');

// 检查目录和文件是否存在
if (!fs.existsSync(indexPath)) {
    console.error(`指定的页面 "${page}" 中没有找到 index.html 文件`);
    process.exit(1);
}

// 启动 live-server
exec(
    `npx live-server ${pageDir} --host=${host} --port=${port} --entry-file=index.html`,
    (error, stdout, stderr) => {
        if (error) {
            console.error(`启动失败: ${error.message}`);
            return;
        }
        if (stderr) console.error(stderr);
        console.log(stdout);

        // 打印访问地址
        console.log(`服务器已启动：`);
        console.log(`- 本地访问: http://localhost:${port}/`);
        console.log(`- 本机 IP 访问: http://${localIP}:${port}/`);
    }
);
