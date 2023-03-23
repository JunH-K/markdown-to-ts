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
      object[header] = values[index];
    });
    return object;
  });
  return objects.filter((v) => !v.key.includes("-"));
}

exports.markdownTableToObjects = markdownTableToObjects;
