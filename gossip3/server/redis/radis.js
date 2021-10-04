const Redis = require("ioredis");
const CONFIG = require("../config");


const redis = new Redis({
  port: CONFIG.REDIS.PORT,
  host: CONFIG.REDIS.HOST,
  family: CONFIG.REDIS.FAMILY,
  password: CONFIG.REDIS.PASSWORD,
  db: CONFIG.REDIS.DB
});


const setData = async (key , value , expiry = false) => {
  try{
    if(typeof key == 'string'){
      let data;
      if(expiry && CONFIG.EXPIRY_SECOND){
        data = await redis.set(key, value , 'EX' , CONFIG.REDIS_EXPIRY_SECOND);
      }
      else{
        data = await redis.set(key, value );
      }
      
      if (data == 'OK') {
        return true
      }
    }
    return false
  }
  catch(err){
    console.log(err)
    return false
  }
}

const getData = async (key , type = '') => {
  try{
    if(typeof key == 'string'){
      const data = await redis.get(key);
      if (data && type == 'JSON') {
        return JSON.parse(data) 
      }
      else if (data) {
        return data
      }
    }
    return false
    
  }
  catch(err){
    console.log(err)
    return false
  }
}

module.exports = {setData, getData};