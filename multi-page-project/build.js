import fs from 'fs';
import path from 'path';
import { minify as htmlMinify } from 'html-minifier';
import { transformAsync } from '@babel/core';
import { minify as terserMinify } from 'terser';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import postcss from 'postcss';
import cssnano from 'cssnano';

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

    // 压缩 HTML 文件
    const htmlPath = path.join(pageDir, 'index.html');
    if (fs.existsSync(htmlPath)) {
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
        const minifiedHtml = htmlMinify(htmlContent, { 
            collapseWhitespace: true,
            minifyCSS: true,  // 压缩 HTML 文件中的内联 CSS
            minifyJS: true    // 压缩 HTML 文件中的内联 JS
        });
        fs.writeFileSync(path.join(outPageDir, 'index.html'), minifiedHtml);
        console.log(`已压缩 ${page} 页面中的 HTML 文件`);
    }

    // 压缩 CSS 文件
    const cssPath = path.join(pageDir, 'css/style.css');
    const cssOutDir = path.join(outPageDir, 'css');
    if (fs.existsSync(cssPath)) {
        if (!fs.existsSync(cssOutDir)) fs.mkdirSync(cssOutDir, { recursive: true });

        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        const minifiedCss = await postcss([cssnano]).process(cssContent, { from: undefined });
        fs.writeFileSync(path.join(cssOutDir, 'style.css'), minifiedCss.css);
        console.log(`已压缩 ${page} 页面中的 CSS 文件到 ${path.join(cssOutDir, 'style.css')}`);
    } else {
        console.log(`CSS 文件未找到: ${cssPath}`);
    }

    // 转换并压缩 JavaScript 文件
    const jsPath = path.join(pageDir, 'js/index.js');
    const jsOutDir = path.join(outPageDir, 'js');
    if (fs.existsSync(jsPath)) {
        if (!fs.existsSync(jsOutDir)) fs.mkdirSync(jsOutDir, { recursive: true });

        const jsContent = fs.readFileSync(jsPath, 'utf-8');
        
        // 使用 Babel 转换为 ES5
        const es5JsContent = (await transformAsync(jsContent, { presets: ['@babel/preset-env'] })).code;

        // 压缩转换后的代码
        const minifiedJs = await terserMinify(es5JsContent);
        if (minifiedJs.code) {
            fs.writeFileSync(path.join(jsOutDir, 'index.js'), minifiedJs.code);
            console.log(`已压缩 ${page} 页面中的 JavaScript 文件到 ${path.join(jsOutDir, 'index.js')}`);
        } else {
            console.error(`JavaScript 压缩失败: ${minifiedJs.error}`);
        }
    } else {
        console.log(`JavaScript 文件未找到: ${jsPath}`);
    }

    // 压缩图片文件
    const assetsDir = path.join(pageDir, 'img');
    const outAssetsDir = path.join(outPageDir, 'img');
    if (fs.existsSync(assetsDir)) {
        fs.mkdirSync(outAssetsDir, { recursive: true });

        await imagemin([`${assetsDir}/*.{jpg,png,gif,svg}`], {
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
        console.log(`已压缩并复制 ${page} 页面中的图片资源到 ${outAssetsDir}`);
    } else {
        console.log(`图片文件夹未找到: ${assetsDir}`);
    }

    console.log(`构建完成：${page}`);
}

buildPage().catch((error) => {
    console.error(`构建失败: ${error.message}`);
});
