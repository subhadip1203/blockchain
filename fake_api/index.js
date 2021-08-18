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

app.get('/delay/:delay', function (req, res) {
    const {delay} = req.params;
    //eslint-disable-next-line sort-keys
    const ping = { status: 'live', message: `delay time ${delay} seconds ` };
    setTimeout(()=>{
        res.status(200).send(ping);
    }, delay * 1000);
});

/*===========================================================================
---------------------------------  Run Server - -----------------------------
=============================================================================*/

const PORT = 8100;
app.listen(PORT, ()=>{
    //eslint-disable-next-line max-len
    console.log(`---- Server started , Listing on PORT : http://localhost:${PORT}`);
});
