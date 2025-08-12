import fs from "fs";
import glob from "glob";

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 工具函数：检查是否有匹配的文件
export function hasFiles(globPattern) {
  return glob.sync(globPattern).length > 0;
}
