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
        return 1
    }    
}

async function publish_to(message){
    // const channel = `my-channel-${publisher_no}`;
    // await redis.publish(channel, JSON.stringify(message));
    
    const publisher = await get_set_next_publisher();
}


module.exports = publish_to