const express = require('express');
const axios = require('axios');
const app = express();

const broadcast = require('./broadcast');

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
    const broadcastData = await axios.get('http://localhost:8100/delay/3')
    console.log(broadcastData.data)
    broadcast()
});

/*===========================================================================
---------------------------------  Run Server - -----------------------------
=============================================================================*/

const PORT = 8000;
app.listen(PORT, ()=>{
    //eslint-disable-next-line max-len
    console.log(`---- Server started , Listing on PORT : http://localhost:${PORT}`);
});
