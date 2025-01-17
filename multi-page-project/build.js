import fs from "fs";
import path from "path";
import { minify as htmlMinify } from "html-minifier";
import { transformAsync } from "@babel/core";
import { minify as terserMinify } from "terser";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";
import postcss from "postcss";
import cssnano from "cssnano";

async function buildPage() {
  const srcDir = path.resolve("src/pages");
  const page = process.argv[2];

  if (!page) {
    console.error("请提供要构建的页面名称，例如：node build.js page1");
    process.exit(1);
  }

  const pageDir = path.join(srcDir, page);
  const outPageDir = path.join(pageDir, "dist");

  if (!fs.existsSync(pageDir)) {
    console.error(`指定的页面 "${page}" 不存在`);
    process.exit(1);
  }

  // 清理旧的输出目录
  if (fs.existsSync(outPageDir)) {
    console.log(`清理旧的输出目录: ${outPageDir}`);
    fs.rmSync(outPageDir, { recursive: true, force: true });
  }

  // 创建新的输出目录
  fs.mkdirSync(outPageDir, { recursive: true });

  // 压缩 HTML 文件
  const htmlPath = path.join(pageDir, "index.html");
  if (fs.existsSync(htmlPath)) {
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    const minifiedHtml = htmlMinify(htmlContent, {
      collapseWhitespace: true,
      minifyCSS: true, // 压缩 HTML 文件中的内联 CSS
      minifyJS: true, // 压缩 HTML 文件中的内联 JS
    });
    fs.writeFileSync(path.join(outPageDir, "index.html"), minifiedHtml);
    console.log(`已压缩 ${page} 页面中的 HTML 文件`);
  }

  // 压缩 CSS 文件
  const cssPath = path.join(pageDir, "css/style.css");
  const cssOutDir = path.join(outPageDir, "css");
  if (fs.existsSync(cssPath)) {
    if (!fs.existsSync(cssOutDir)) fs.mkdirSync(cssOutDir, { recursive: true });

    const cssContent = fs.readFileSync(cssPath, "utf-8");
    const minifiedCss = await postcss([cssnano]).process(cssContent, {
      from: undefined,
    });
    fs.writeFileSync(path.join(cssOutDir, "style.css"), minifiedCss.css);
    console.log(
      `已压缩 ${page} 页面中的 CSS 文件到 ${path.join(cssOutDir, "style.css")}`
    );
  } else {
    console.log(`CSS 文件未找到: ${cssPath}`);
  }

  // 转换并压缩 JavaScript 文件
  const jsDir = path.join(pageDir, "js");
  const jsOutDir = path.join(outPageDir, "js");

  if (fs.existsSync(jsDir)) {
    if (!fs.existsSync(jsOutDir)) fs.mkdirSync(jsOutDir, { recursive: true });

    const jsFiles = fs
      .readdirSync(jsDir)
      .filter((file) => file.endsWith(".js"));

    for (const file of jsFiles) {
      const filePath = path.join(jsDir, file);
      const fileOutPath = path.join(jsOutDir, file);

      const jsContent = fs.readFileSync(filePath, "utf-8");

      try {
        // 使用 Babel 转换为 ES5
        const es5JsContent = (
          await transformAsync(jsContent, { presets: ["@babel/preset-env"] })
        ).code;

        // 压缩转换后的代码
        const minifiedJs = await terserMinify(es5JsContent);
        if (minifiedJs.code) {
          fs.writeFileSync(fileOutPath, minifiedJs.code);
          console.log(`已压缩 ${file} 文件到 ${fileOutPath}`);
        } else {
          console.error(`JavaScript 压缩失败: ${minifiedJs.error}`);
        }
      } catch (err) {
        console.error(`处理 JavaScript 文件 ${file} 时出错: ${err.message}`);
      }
    }
  } else {
    console.log(`JavaScript 文件夹未找到: ${jsDir}`);
  }

  // 压缩图片文件
  const assetsDir = path.join(pageDir, "img");
  const outAssetsDir = path.join(outPageDir, "img");
  if (fs.existsSync(assetsDir)) {
    fs.mkdirSync(outAssetsDir, { recursive: true });

    await imagemin([`${assetsDir}/*.{jpg,png,gif,svg}`], {
      destination: outAssetsDir,
      plugins: [
        imageminMozjpeg({ quality: 75 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
        imageminGifsicle({ optimizationLevel: 2 }),
        imageminSvgo({
          plugins: [{ removeViewBox: false }],
        }),
      ],
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
