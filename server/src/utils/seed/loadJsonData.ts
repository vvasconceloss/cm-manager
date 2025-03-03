import fs from "fs";  
  
const loadJsonDataFile = (filePath: string) => {
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return jsonData;
}

export default loadJsonDataFile;