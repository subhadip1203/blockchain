const fs = require('fs')
const SetUp = require('../setup')
const NODES_CONFIG = require('../configs/config_node')
const{ExistingBlockData, CreateGenesisBlock, SaveBlock} = require('../coreFunctions/index')



async function startApp(){

    if(NODES_CONFIG.ADMIN_NODES.length == 1 && NODES_CONFIG.ADMIN_NODES[0] == SetUp.myaddress){
        console.log("creating Genesis network ....")
        
        let BlockDataSummary = await ExistingBlockData()
        
        if(BlockDataSummary) {
            
        
            if(BlockDataSummary.last_block == 0 ) {
                console.log("creating Genesis block in the chain ....")
                let genblock = await CreateGenesisBlock();
                let savedGenBlock = await SaveBlock( genblock);
                
                if(savedGenBlock){
                    console.log("Saved Genesis block in the chain ....")
                    
                    if(typeof savedGenBlock == 'object'){
                        console.log(savedGenBlock)
                    }
                   


                }
                else{
                    console.log("data not saved")
                }
            }
            else{
                console.log("adding block in the chain  ....")
                //SaveBlock()
            }
            
        }
        else{
            console.log("issue in reading exixting data ....")          
        }
        
    }
    else{
        console.log("Trying to connect a network ....")
        console.log(SetUp.myaddress)
    }
    
}


module.exports = startApp