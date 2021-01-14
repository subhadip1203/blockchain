const fs = require("fs");



function isValidJSON(text) {
    try {
        return JSON.parse(text);
    } 
    catch {
        throw new Error('data is not valid JSON');
    }
}

async function readJSONFile (filePath){
    
    try {
      const data = await fs.promises.readFile(filePath, 'utf8')
      return (isValidJSON(data))
    }
    catch(ex) {
        console.error(ex.message);
        return false
    }
    
}

async function writeJSONFile(filePath , data){
    try {
        console.log(data)
        if(Array.isArray(data)) {
            fs.promises.writeFile(filePath, JSON.stringify(data, 0, 4))
            return true;
        }
        else{
            return false;
        }
        
    }
    catch(ex) {
        console.error(ex.message);
        return false
    }
  
}

module.exports = {readJSONFile ,writeJSONFile}