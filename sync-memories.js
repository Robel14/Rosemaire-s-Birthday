import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const memoriesDir = path.join(__dirname, 'public', 'memories');
const memoryJsxPath = path.join(__dirname, 'src', 'pages', 'Memory.jsx');

console.log('Scanning memories directories...');

const memoryData = {};

try {
  const folders = fs.readdirSync(memoriesDir);
  
  folders.forEach(folder => {
    const folderPath = path.join(memoriesDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath).filter(file => {
        // Only include actual files (ignore hidden files like .DS_Store)
        return !file.startsWith('.') && fs.statSync(path.join(folderPath, file)).isFile();
      });
      
      memoryData[folder] = {
        path: `/memories/${folder}/`,
        files: files
      };
      
      console.log(`Found ${files.length} files in ${folder}`);
    }
  });

  // Now, we need to update Memory.jsx
  let content = fs.readFileSync(memoryJsxPath, 'utf8');
  
  // Find the memoryData object definition in Memory.jsx
  const startStr = 'const memoryData = {';
  const startIndex = content.indexOf(startStr);
  
  if (startIndex !== -1) {
    // We need to find the matching closing brace. 
    // Since we know it's a simple object, we can just look for the closing brace followed by a semicolon or newline.
    // However, since we're using replace, we can use a more robust regex to replace the entire block.
    
    // Instead of regex, let's just replace everything from "const memoryData = {" to "  const currentMemory = memoryData[id];"
    const endStr = '  const currentMemory = memoryData[id];';
    const endIndex = content.indexOf(endStr);
    
    if (endIndex !== -1) {
      const newDataString = 'const memoryData = ' + JSON.stringify(memoryData, null, 4) + ';\n\n';
      const newContent = content.substring(0, startIndex) + newDataString + content.substring(endIndex);
      fs.writeFileSync(memoryJsxPath, newContent, 'utf8');
      console.log('\nSuccess! Memory.jsx has been updated with your exact file names.');
    } else {
      console.error('Could not find the end of memoryData block in Memory.jsx');
    }
  } else {
    console.error('Could not find memoryData in Memory.jsx');
  }

} catch (err) {
  console.error('Error syncing memories:', err);
}
