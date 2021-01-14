const fs = require("fs");
const {readJSONFile , writeJSONFile} = require('../helpers/read_write_files')
const SetUp = require('../setup')
const GLOBAL_CONFIG = require('../configs/config_global')

const {createValidBlock , checksumFile} = require('../helpers/block_hash')

async function ExistingBlockData (){
    try{
        let temp_memory_data = await readJSONFile( SetUp.BlockContainer+'/temp_memory.json');
        return temp_memory_data
    }
    catch{
        return false;
    }
}

async function CreateGenesisBlock(){
    GenesisBlock = {
        id: 1,
        data : '',
        time:Math.floor(Date.now() / 1000),
        nonce : SetUp.NONCE,
        previousHash : GLOBAL_CONFIG.HASH_KEY_START_WITH,
    }
    var ValidBlockresult = createValidBlock(GenesisBlock)
    return ValidBlockresult;
}





async function SaveBlock(block){
    try{
        fileID= parseInt( parseInt(block.id) / parseInt(GLOBAL_CONFIG.NO_OF_BLOCKS_IN_SINGLE_FILE))+1;
        filepath = SetUp.BlockContainer+'/blockFile_'+fileID+'.json';
        let blocks_in_file =[]
        
        if (fs.existsSync(filepath)) {
            blocks_in_file = await readJSONFile(filepath);
        }
        blocks_in_file.push(block)
        let new_block_saving_status = await writeJSONFile(filepath , blocks_in_file)
        if(new_block_saving_status){
            let hash_of_file = await checksumFile ('sha256' , filepath)
            return {
                last_block : parseInt(block.id) ,
                block_files_no: parseInt(fileID) ,
                block_files_name: filepath,
                filehash : hash_of_file
            }
        }
        else{
            return false
        }
        
    }
    catch(e){
        console.log(e)
    }
   
}





// async function SaveBlock(block){
//     try{
//         let temp_memory_data = await readJSONFile( SetUp.BlockContainer+'/temp_memory.json');
//         if(temp_memory_data != false){
//             if(temp_memory_data.last_block >= 0){
//                 block.id = parseInt(temp_memory_data.last_block)+1;
//                 block.time = Math.floor(Date.now() / 1000);
//                 block.nonce = SetUp.NONCE
//                 console.log(block)
//             }
            
//         }
//         else{
//             console.log("isse in file read")
//         }
//     }
//     catch(e){
//         console.log(e)
//     }
   
// }


module.exports = { ExistingBlockData , CreateGenesisBlock, SaveBlock}