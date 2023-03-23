const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const { markdownTableToObjects } = require("./functions");

const currentDir = `${process.cwd()}`;

fs.readdir(currentDir, (err, files) => {
  if (err) {
    console.error(`Unable to read directory ${currentDir}`, err);
    process.exit(1);
  }

  const mdFiles = files.filter((file) => {
    const filePath = path.join(currentDir, file);
    const { name, ext } = path.parse(filePath);
    return name.includes(".type") && ext === ".md";
  });

  if (mdFiles.length === 0) {
    console.log("No Markdown files found in the current directory.");
    const mdPath = path.join(currentDir, "./", "Sample.type.md");
    const content = `| key         | type         | description | back_field  |
|-------------|--------------|-------------|-------------|
| name?       | string       | 이름        | name        |
| id          | number       | ID          | product_id |
| age         | number       | 나이        | age        |
| productName | string       | 상품명      | product_name |
| price       | number       | 가격        | price      |
| test        | string       | 테스트      | test       |
| argsFunc    | (args:number)=>void | 테스트      | test       |`;
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

  mdFiles.forEach((mdFile) => {
    const mdFilePath = path.join(currentDir, mdFile);
    fs.readFile(mdFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Unable to read file ${mdFilePath}`, err);
        return;
      }
      const filename = path.parse(mdFile).name.replace(".type", "");

      const toArr = markdownTableToObjects(data);

      let types = "";
      toArr.forEach((value) => {
        types += `${value.key}:${value.type};//${value.description}\n`;
      });

      //content
      const content = `
        type ${filename}Type = {
            ${types}
        }
        export default ${filename}Type`;

      if (!fs.existsSync(currentDir)) {
        fs.mkdirSync(currentDir, { recursive: true });
      }

      const typePath = path.join(currentDir, "./", `${filename}Type.ts`);

      //write
      fs.writeFile(
        typePath,
        prettier.format(content, {
          parser: "typescript",
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          trailingComma: "es5",
        }),
        (err) => {
          if (err) {
            console.error(`Unable to write file ${typePath}`, err);
            process.exit(1);
          }

          console.log(`UserType file generated at ${typePath}`);
          process.exit(0);
        }
      );
    });
  });
});
