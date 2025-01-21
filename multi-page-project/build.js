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
import autoprefixer from "autoprefixer";

// 转换图片为 Base64
function encodeToBase64(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString("base64");
  const ext = path.extname(filePath).substring(1);
  return `data:image/${ext};base64,${base64Data}`;
}

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

  // 清理 dist 目录
  if (fs.existsSync(outPageDir)) {
    console.log(`清理旧的输出目录: ${outPageDir}`);
    fs.rmSync(outPageDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outPageDir, { recursive: true });

  const imgDir = path.join(pageDir, "img");
  let base64Images = new Set();

  // 处理 HTML 文件
  const htmlPath = path.join(pageDir, "index.html");
  if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, "utf-8");

    // 处理 HTML 中的图片，转换小于 10KB 的图片
    if (fs.existsSync(imgDir)) {
      const imageFiles = fs.readdirSync(imgDir);
      imageFiles.forEach((img) => {
        const imgPath = path.join(imgDir, img);
        const fileSize = fs.statSync(imgPath).size;
        if (fileSize < 10 * 1024) {
          const base64Img = encodeToBase64(imgPath);
          htmlContent = htmlContent.replace(new RegExp(img, "g"), base64Img);
          base64Images.add(img); // 记录已转换的图片
          console.log(`已将 HTML 中的 ${img} 替换为 Base64`);
        }
      });
    }

    const minifiedHtml = htmlMinify(htmlContent, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    });
    fs.writeFileSync(path.join(outPageDir, "index.html"), minifiedHtml);
    console.log(`已压缩 ${page} 页面中的 HTML 文件`);
  }

  // 处理 CSS 文件
  const cssPath = path.join(pageDir, "css/style.css");
  const cssOutDir = path.join(outPageDir, "css");
  if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, "utf-8");

    // 处理 CSS 内的图片
    const imgRegex = /url\(["']?(img\/.*?\.(png|jpg|jpeg|gif|svg))["']?\)/g;
    let match;
    while ((match = imgRegex.exec(cssContent)) !== null) {
      const imgPath = path.join(pageDir, match[1]);
      if (fs.existsSync(imgPath)) {
        const fileSize = fs.statSync(imgPath).size;
        if (fileSize < 10 * 1024) {
          const base64Img = encodeToBase64(imgPath);
          cssContent = cssContent.replace(match[0], `url("${base64Img}")`);
          base64Images.add(path.basename(match[1]));
          console.log(`已将 CSS 中的 ${match[1]} 转换为 Base64`);
        }
      }
    }

    const processedCss = await postcss([autoprefixer, cssnano]).process(cssContent, {
      from: undefined,
    });

    if (!fs.existsSync(cssOutDir)) fs.mkdirSync(cssOutDir, { recursive: true });
    fs.writeFileSync(path.join(cssOutDir, "style.css"), processedCss.css);
    console.log(`已压缩并添加兼容前缀的 CSS 文件到 ${path.join(cssOutDir, "style.css")}`);
  } else {
    console.log(`CSS 文件未找到: ${cssPath}`);
  }

  // 处理 JavaScript 文件
  const jsDir = path.join(pageDir, "js");
  const jsOutDir = path.join(outPageDir, "js");
  if (fs.existsSync(jsDir)) {
    if (!fs.existsSync(jsOutDir)) fs.mkdirSync(jsOutDir, { recursive: true });

    const jsFiles = fs.readdirSync(jsDir).filter((file) => file.endsWith(".js"));
    for (const file of jsFiles) {
      const filePath = path.join(jsDir, file);
      const fileOutPath = path.join(jsOutDir, file);

      const jsContent = fs.readFileSync(filePath, "utf-8");
      try {
        const es5JsContent = (await transformAsync(jsContent, { presets: ["@babel/preset-env"] })).code;
        const minifiedJs = await terserMinify(es5JsContent);
        if (minifiedJs.code) {
          fs.writeFileSync(fileOutPath, minifiedJs.code);
          console.log(`已压缩 ${file} 文件到 ${fileOutPath}`);
        }
      } catch (err) {
        console.error(`处理 JavaScript 文件 ${file} 时出错: ${err.message}`);
      }
    }
  }

  // 处理图片（仅拷贝未被转换为 Base64 的）
  const outAssetsDir = path.join(outPageDir, "img");
  if (fs.existsSync(imgDir)) {
    fs.mkdirSync(outAssetsDir, { recursive: true });

    const imgFiles = fs.readdirSync(imgDir);
    for (const img of imgFiles) {
      if (!base64Images.has(img)) {
        fs.copyFileSync(path.join(imgDir, img), path.join(outAssetsDir, img));
        console.log(`已拷贝图片 ${img}`);
      }
    }

    // 压缩图片
    await imagemin([`${outAssetsDir}/*.{jpg,png,gif,svg}`], {
      destination: outAssetsDir,
      plugins: [
        imageminMozjpeg({ quality: 75 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
        imageminGifsicle({ optimizationLevel: 2 }),
        imageminSvgo({ plugins: [{ removeViewBox: false }] }),
      ],
    });
    console.log(`已压缩图片资源`);
  }

  console.log(`构建完成：${page}`);
}

buildPage().catch((error) => {
  console.error(`构建失败: ${error.message}`);
});
