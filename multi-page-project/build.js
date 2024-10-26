import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';
import { minify as terserMinify } from 'terser';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';

async function buildPage() {
    const srcDir = path.resolve('src/pages');
    const page = process.argv[2];

    if (!page) {
        console.error('请提供要构建的页面名称，例如：node build.js page1');
        process.exit(1);
    }

    const pageDir = path.join(srcDir, page);
    const outPageDir = path.join(pageDir, 'dist');

    if (!fs.existsSync(pageDir)) {
        console.error(`指定的页面 "${page}" 不存在`);
        process.exit(1);
    }

    if (!fs.existsSync(outPageDir)) fs.mkdirSync(outPageDir, { recursive: true });

    const htmlPath = path.join(pageDir, 'index.html');
    if (fs.existsSync(htmlPath)) {
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
        const minifiedHtml = minify(htmlContent, { collapseWhitespace: true });
        fs.writeFileSync(path.join(outPageDir, 'index.html'), minifiedHtml);
    }

    const cssPath = path.join(pageDir, 'style.css');
    if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        fs.writeFileSync(path.join(outPageDir, 'style.css'), cssContent);
    }

    const jsPath = path.join(pageDir, 'script.js');
    if (fs.existsSync(jsPath)) {
        const jsContent = fs.readFileSync(jsPath, 'utf-8');
        const minifiedJs = await terserMinify(jsContent);
        fs.writeFileSync(path.join(outPageDir, 'script.js'), minifiedJs.code);
    }

    const assetsDir = path.join(pageDir, 'img');
    if (fs.existsSync(assetsDir)) {
        const outAssetsDir = path.join(outPageDir, 'img');
        fs.mkdirSync(outAssetsDir, { recursive: true });

        const files = await imagemin([`${assetsDir}/*.{jpg,png,gif,svg}`], {
            destination: outAssetsDir,
            plugins: [
                imageminMozjpeg({ quality: 75 }),
                imageminPngquant({ quality: [0.6, 0.8] }),
                imageminGifsicle({ optimizationLevel: 2 }),
                imageminSvgo({
                    plugins: [{ removeViewBox: false }]
                })
            ]
        });
        console.log(`已压缩并复制 ${page} 页面中的图片资源`);
    }

    console.log(`构建完成：${page}`);
}

buildPage().catch((error) => {
    console.error(`构建失败: ${error.message}`);
});
