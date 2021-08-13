var fs = require('fs');
const crypto = require('crypto');
const GLOBAL_CONFIG = require('../configs/config_global')


function HashObj256(obj){
    return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}


function createValidBlock(receiveddata){
    data = {...receiveddata}
    let hashResult = '';
    let loop = true
    
    while( loop ) {
        hashResult = HashObj256(data);
        
        if(hashResult.startsWith(GLOBAL_CONFIG.HASH_KEY_START_WITH) ){
            loop = false
            data.hash = hashResult;
        }
        else{
            data.nonce =hashResult
        }
          
    }
    return data
}


function checksumFile(hashName, path) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(hashName);
        const stream = fs.createReadStream(path);
        stream.on('error', err => reject(err));
        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
    });
}

module.exports = {createValidBlock , checksumFile}