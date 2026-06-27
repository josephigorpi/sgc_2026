
const fs = require('fs');
const path = require('path');

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fileList = walkDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

try {
  const allFiles = walkDir(__dirname);
  console.log('All files in project:');
  allFiles.forEach(f => console.log(f));
} catch (err) {
  console.error('Error listing files:', err);
}
