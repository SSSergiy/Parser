const fs = require('fs');

function colorParser(objects, directory) {
  let groupedObjects = {};
  for (let object of objects) {
    if (groupedObjects[object.color] === undefined) {
      groupedObjects[object.color] = [];
    }
    groupedObjects[object.color].push(object);
  }
  let createdFiles = [];
  for (let color in groupedObjects) {
    let folderPath = directory + '/' + color;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    let fileName = color + '.json';
    let filePath = folderPath + '/' + fileName;
    let fileContent = JSON.stringify(groupedObjects[color], null, 2);
    fs.writeFileSync(filePath, fileContent);
    createdFiles.push(filePath);
  }
  return createdFiles;
}

const data = require('./polygonscopy.json');
const directory = './output';
const files = colorParser(data.data, directory);



