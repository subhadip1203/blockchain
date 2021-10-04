const express = require('express');
const app = express();
const redisInit = require('./redis/initialData');
const {receiveData, myPeers} = require('./action/index')

/*===================================================================
                    Middleware initilization         
==================================================================== */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*===========================================================================
---------------------------------  routes - -----------------------------
=============================================================================*/
app.get('/', async function (req, res) {
    const ping = { status: 'live', time: new Date().getTime() };
    res.status(200).send(ping);
    const data = await setData("foo", Math.random() );
    receiveData(req.body)
});

app.post('/', async function (req, res) {
    const ping = { status: 'received', time: new Date().getTime() };
    res.status(200).send(ping);
    const peers = await receiveData(req.body)
    console.log(peers)
});

app.get('/mypeers', async function (req, res) {
    try{
        const myPeerData = await myPeers();
        const responseData = { status: 'get', time: new Date().getTime()  , peers : myPeerData };
        res.status(200).send(responseData);
    }
    catch(err){
        console.log(err)
        res.status(400).send({err : err });
    }
    
    
});

/*===========================================================================
---------------------------------  Run Server - -----------------------------
=============================================================================*/

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`---- Server started , Listing on PORT : http://localhost:${PORT}`);
    redisInit();
});
