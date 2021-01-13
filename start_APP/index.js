const fs = require('fs')
const SetUp = require('../setup')
const NODES_CONFIG = require('../configs/config_node')

async function startApp(){

    if(NODES_CONFIG.ADMIN_NODES.length == 1 && NODES_CONFIG.ADMIN_NODES[0] == SetUp.myaddress){
        console.log("creating Genesis network ....")
        
        if(fs.existsSync(SetUp.BlockContainer+'/blocks_1.json')) {
            console.log("reading file")
        }
        else{
            console.log("creating Genesis block ....")            
        }
        
    }
    else{
        console.log("Trying to connect a network ....")
        console.log(SetUp.myaddress)
    }
    
}


module.exports = startApp