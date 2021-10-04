const { json } = require('express')
const {setData,getData} = require('./radis')

const redisInit = async () =>{
  if (!await getData('peers')) {
    datString = JSON.stringify(['abc','efg'])
    const status = await setData('peers' , datString)
    if (status) {
      console.log("initial peer added ...")
    }
  }
  else{
    datString = JSON.stringify(['abc','efg'])
    const status = await setData('peers' , datString)
    if (status) {
      console.log("initial peer added ...")
    }
  }
}

module.exports = redisInit