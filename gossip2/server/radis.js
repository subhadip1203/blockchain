const Redis = require("ioredis");
const redis = new Redis();
const SUBSCRIBERS_no = process.env.SUBSCRIBERS ? parseInt(process.env.SUBSCRIBERS) :1

redis.set("current_publisher", SUBSCRIBERS_no)
.then( sts => console.log(`current value :${sts}`))
.catch(err=> console.log(err))

async function get_set_next_publisher(){
    try{
        const cur_subs = await redis.get("current_publisher");
        next_subs = (parseInt(cur_subs) % SUBSCRIBERS_no)+1
        const status = await redis.set("current_publisher", next_subs);
        if (status == 'OK'){
            console.log("next subscriber no :"+next_subs) 
            return next_subs
        }        
    }
    catch(err){
        console.log(err)
        return null
    }    
}

async function publish_to(message){    
    
    const subscriber = await get_set_next_publisher();
    if(subscriber){
        const channel = `my-channel-${subscriber}`;
        await redis.publish(channel, JSON.stringify(message));
    }
}


module.exports = publish_to