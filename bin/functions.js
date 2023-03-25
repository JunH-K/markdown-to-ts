/**
 *
 * @param markdownTable
 * @returns {{}[]}
 */
function markdownTableToObjects(markdownTable) {
  const rows = markdownTable.split("\n").map((row) => row.trim());
  const headers = rows
    .shift()
    .split("|")
    .map((header) => header.trim())
    .filter((header) => header !== "");

  const objects = rows.map((row) => {
    const values = row
      .split("|")
      .map((value) => value.trim())
      .filter((value) => value !== "");

    const object = {};
    headers.forEach((header, index) => {
      let type = values[index].replace(
        /^([a-zA-Z"']+),([a-zA-Z"']+)$/,
        "$1|$2"
      );
      object[header] = type;
    });
    return object;
  });
  return objects.filter((v) => !v.key.includes("-"));
}

/**
 *
 * @param files
 * @param path
 * @param currentDir
 * @returns {files}
 */
function getTypeMdFiles(files, path, currentDir) {
  return files.filter((file) => {
    const filePath = path.join(currentDir, file);
    const { name, ext } = path.parse(filePath);
    return name.includes(".type") && ext === ".md";
  });
}

/**
 *
 * @param mdFiles
 * @param path
 * @param currentDir
 * @param content
 */
function createTypeMdFiles(fs, mdFiles, path, currentDir, content) {
  if (mdFiles.length === 0) {
    console.log("No Markdown files found in the current directory.");
    const mdPath = path.join(currentDir, "./", "Sample.type.md");

    //create md
    fs.writeFile(mdPath, content, (err) => {
      if (err) {
        console.error(`Unable to write file ${mdPath}`, err);
        process.exit(1);
      }

      console.log(`Create markdown at ${mdPath}`);
      process.exit(0);
    });
  }
}

/**
 *
 * @param fs
 * @param mdFiles
 * @param path
 * @param currentDir
 * @param prettier
 */
function createMdToType(fs, mdFiles, path, currentDir, prettier) {
  mdFiles.forEach((mdFile) => {
    const mdFilePath = path.join(currentDir, mdFile);

    fs.readFile(mdFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Unable to read file ${mdFilePath}`, err);
        return;
      }
      const filename = getFilename(path, mdFile);

      const toArr = markdownTableToObjects(data);

      let types = "";
      toArr.forEach((value) => {
        types += `${value.key}:${value.type};//${value.description}\n`;
      });

      if (!fs.existsSync(currentDir)) {
        fs.mkdirSync(currentDir, { recursive: true });
      }
      const typePath = path.join(currentDir, "./", `${filename}Type.ts`);

      const content = `
        type ${filename}Type = {
            ${types}
        }
        export default ${filename}Type`;

      write(fs, typePath, prettier, content, filename);
    });
  });
}

/**
 *
 * @param fs
 * @param mdFiles
 * @param path
 * @param currentDir
 * @param prettier
 */
function createMdToJsx(fs, mdFiles, path, currentDir, prettier) {
  mdFiles.forEach((mdFile) => {
    const mdFilePath = path.join(currentDir, mdFile);
    fs.readFile(mdFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Unable to read file ${mdFilePath}`, err);
        return;
      }
      const filename = getFilename(path, mdFile);

      const toArr = markdownTableToObjects(data);

      let types = "";
      toArr.forEach((value) => {
        types += `${value.key}:${value.type};//${value.description}\n`;
      });

      //content
      const content = `
      type Props ={
         ${types}[key:string]:any;
      }
      
      function ${filename}(props:Props){
        return <div>${filename} Component</div>
    }

        export default ${filename}`;

      if (!fs.existsSync(currentDir)) {
        fs.mkdirSync(currentDir, { recursive: true });
      }

      const typePath = path.join(currentDir, "./", `${filename}.tsx`);

      //write
      write(fs, typePath, prettier, content, filename);
    });
  });
}

/**
 *
 * @param fs
 * @param path
 * @param prettier
 * @param content
 * @param filename
 */
function write(fs, path, prettier, content, filename) {
  fs.writeFile(
    path,
    prettier.format(content, {
      parser: "typescript",
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      trailingComma: "es5",
    }),
    (err) => {
      if (err) {
        console.error(`Unable to write file ${path}`, err);
        process.exit(1);
      }

      console.log(`${filename} file generated at ${path}`);
      process.exit(0);
    }
  );
}

function getFilename(path, mdFile) {
  return path.parse(mdFile).name.replace(".type", "");
}

exports.markdownTableToObjects = markdownTableToObjects;
exports.getTypeMdFiles = getTypeMdFiles;
exports.createTypeMdFiles = createTypeMdFiles;
exports.createMdToType = createMdToType;
exports.createMdToJsx = createMdToJsx;
