const express = require('express');
const app = express();

const Redis = require("ioredis");
const redis = new Redis();
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
    const message = { foo: Math.random() };
    const channel = `my-channel-${1 + Math.round(Math.random())}`;
    redis.publish(channel, JSON.stringify(message));
    console.log("Published %s to %s", message, channel);
});

/*===========================================================================
---------------------------------  Run Server - -----------------------------
=============================================================================*/

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`---- Server started , Listing on PORT : http://localhost:${PORT}`);
});
