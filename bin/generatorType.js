const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const {
  getTypeMdFiles,
  createTypeMdFiles,
  createMdToType,
} = require("./functions");
const { mdContent } = require("./content");

const currentDir = `${process.cwd()}`;

fs.readdir(currentDir, (err, files) => {
  if (err) {
    console.error(`Unable to read directory ${currentDir}`, err);
    process.exit(1);
  }
  const mdFiles = getTypeMdFiles(files, path, currentDir);
  createTypeMdFiles(fs, mdFiles, path, currentDir, mdContent);
  createMdToType(fs, mdFiles, path, currentDir, prettier);
});
