const express = require('express');

const app = express();

/*===================================================================
                    Middleware initilization         
==================================================================== */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*===========================================================================
---------------------------------  routes - -----------------------------
=============================================================================*/
app.get('/', function (req, res) {
    const ping = { status: 'live', time: new Date().getTime() };
    res.status(200).send(ping);
});

/*===========================================================================
---------------------------------  Run Server - -----------------------------
=============================================================================*/

const PORT = 8000;
app.listen(PORT, ()=>{
    //eslint-disable-next-line max-len
    console.log(`---- Server started , Listing on PORT : http://localhost:${PORT}`);
});
