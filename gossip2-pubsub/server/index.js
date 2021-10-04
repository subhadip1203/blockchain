require('dotenv').config()
const express = require('express');
const app = express();

const publish_to = require('./radis')

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
    await publish_to()
});

/*===========================================================================
---------------------------------  Run Server - -----------------------------
=============================================================================*/

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`---- Server started , Listing on PORT : http://localhost:${PORT}`);
});
