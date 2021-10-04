
const { setData, getData } = require('../redis/radis')


const addPeers = async ( peerarray) => {
  try {
    const  mypeers = await getData("peers" , 'JSON')
    if(mypeers){
      // console.log(mypeers, peerarray);
      // console.log([...mypeers, ...peerarray]);
      const updatedPeers = [...new Set([...mypeers , ...peerarray])];
      // console.log(updatedPeers);
      if (updatedPeers.length > mypeers.length) {
        // console.log(JSON.stringify(updatedPeers));
        const status = await setData( 'peers' , JSON.stringify(updatedPeers) )
        if(status){
          console.log("datasaved")
          return updatedPeers
        }
      }
      return mypeers
    }
    return []
    
  }
  catch (err) {
    console.log(err)
    return false
  }
}

const updateRedisdata = async (dataID , peers ,data ) => {
  try{
    const requestdata = await getData(dataID , 'JSON');
    if(requestdata){
      if(requestdata.peers.length != peers.length) {
        requestdata.peers = [...new Set([...requestdata.peers , ...peers])]
      }
    }
    else{
      requestStorage = JSON.stringify({peers : peers, data : data });
      await setData(dataID , requestStorage , true);
    }
    return peers
  }
  catch(err) {
    console.log(err)
    return false
  }
  
}

const receiveData = async (rec) => {
  try {
    const { dataId, notifiedPeers, data ,failedPeers} = rec
    const allpeers = await addPeers(notifiedPeers)
    console.log(allpeers)
    const peersAssociated = await updateRedisdata(dataId,notifiedPeers, data )
    const peersLeft = allpeers.filter( ( el ) => !peersAssociated.includes( el ) );
    return peersLeft
  }
  catch (err) {
    console.log(err)
  }


};

const myPeers = async() => {
  try{
    const  allmypeers = await getData("peers" , 'JSON')
    return allmypeers
  }
  catch(err){
    console.log(err)
  }
}

module.exports = {receiveData ,myPeers}